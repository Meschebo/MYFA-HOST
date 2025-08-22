import 'dotenv/config';
import { Telegraf } from 'telegraf';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient, ServerApiVersion } from 'mongodb';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

// MongoDB connection
const uri = process.env.MONGO_URI;
if (!uri) {
  console.error("❌ MONGO_URI not found in .env file. Please add it.");
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;
let botsCollection, commandsCollection, errorsCollection;
let activeBots = {};

async function connectToMongo() {
  try {
    await client.connect();
    db = client.db("botAltoDB");
    console.log("✅ Connected to MongoDB!");

    botsCollection = db.collection("bots");
    commandsCollection = db.collection("commands");
    errorsCollection = db.collection("errors");
    
    // Relaunch any bots that were running
    const runningBots = await botsCollection.find({ status: 'RUN' }).toArray();
    for (const bot of runningBots) {
        console.log(` relaunching bot ${bot.name}`)
        await launchBot(bot.botId);
    }


    startServer();
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}

async function launchBot(botId) {
  const botCfg = await botsCollection.findOne({ botId });
  if (!botCfg) return false;

  if (activeBots[botId]) {
    try {
      await activeBots[botId].stop('SIGTERM');
    } catch (_) {}
    delete activeBots[botId];
  }

  const instance = new Telegraf(botCfg.token, {
    handlerTimeout: 9000
  });

  await registerHandlers(instance, botId);
  instance.launch({ polling: { timeout: 3 } });
  activeBots[botId] = instance;
  await botsCollection.updateOne({ botId }, { $set: { status: 'RUN' } });
  console.log(`🤖 Bot ${botCfg.name} started.`);
  return true;
}

async function stopBot(botId) {
  if (activeBots[botId]) {
    try {
      await activeBots[botId].stop('SIGTERM');
      console.log(`🛑 Bot with ID ${botId} stopped.`);
    } catch (e) {
      console.error(`Error stopping bot ${botId}:`, e.message)
    }
    delete activeBots[botId];
  }
  await botsCollection.updateOne({ botId }, { $set: { status: 'STOP' } });
  return true;
}

async function registerHandlers(instance, botId) {
  const botCommands = await commandsCollection.findOne({ botId });
  if (botCommands && botCommands.commands) {
    for (const cmd in botCommands.commands) {
      const raw = cmd.replace('/', '');
      instance.command(raw, async (ctx) => {
        try {
          new Function('ctx', botCommands.commands[cmd])(ctx);
        } catch (e) {
          ctx.reply(`⚠️ Error in command ${cmd}: ${e.message}`);
          await storeError(botId, e.message, cmd);
        }
      });
    }
  }
}

async function storeError(botId, errorMessage, command) {
  await errorsCollection.insertOne({
    botId,
    timestamp: new Date(),
    message: errorMessage,
    command: command
  });
}

// API Endpoints
app.post('/createBot', async (req, res) => {
  const { token, name } = req.body;
  if (!token || !name) return res.status(400).json({ ok: false, error: "Token and name are required." });
  try {
    const id = Math.random().toString(36).substring(2, 15);
    await botsCollection.insertOne({ botId: id, token, name, status: 'STOP', createdAt: new Date() });
    await commandsCollection.insertOne({ botId: id, commands: {} });
    res.json({ ok: true, botId: id });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.post('/deleteBot', async (req, res) => {
  const { botId } = req.body;
  if (!botId) return res.status(400).json({ ok: false, error: "botId is required." });
  try {
    await stopBot(botId);
    await botsCollection.deleteOne({ botId });
    await commandsCollection.deleteOne({ botId });
    await errorsCollection.deleteMany({ botId });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.post('/startBot', async (req, res) => {
  const { botId } = req.body;
  if (!botId) return res.status(400).json({ ok: false, error: "botId is required." });
  try {
    const success = await launchBot(botId);
    res.json({ ok: success });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.post('/stopBot', async (req, res) => {
  const { botId } = req.body;
  if (!botId) return res.status(400).json({ ok: false, error: "botId is required." });
  try {
    const success = await stopBot(botId);
    res.json({ ok: success });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.get('/getBots', async (_, res) => {
  try {
    const list = await botsCollection.find({}).toArray();
    res.json(list);
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.get('/getCommands', async (req, res) => {
  const botId = req.query.botId;
  if (!botId) return res.status(400).json({ ok: false, error: "botId is required." });
  try {
    const botCommands = await commandsCollection.findOne({ botId });
    res.json(botCommands?.commands || {});
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.get('/getErrors', async (req, res) => {
  const botId = req.query.botId;
  if (!botId) return res.status(400).json({ ok: false, error: "botId is required." });
  try {
    const errs = await errorsCollection.find({ botId }).sort({ timestamp: -1 }).limit(50).toArray();
    res.json(errs);
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.post('/addCommand', async (req, res) => {
  const { botId, name, code } = req.body;
  if (!botId || !name || !code) return res.status(400).json({ ok: false, error: "botId, name, and code are required." });
  try {
    await commandsCollection.updateOne({ botId }, { $set: { [`commands.${name}`]: code } }, { upsert: true });
    if (activeBots[botId]) {
      await stopBot(botId);
      await launchBot(botId);
    }
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.post('/delCommand', async (req, res) => {
  const { botId, name } = req.body;
  if (!botId || !name) return res.status(400).json({ ok: false, error: "botId and name are required." });
  try {
    await commandsCollection.updateOne({ botId }, { $unset: { [`commands.${name}`]: "" } });
    if (activeBots[botId]) {
      await stopBot(botId);
      await launchBot(botId);
    }
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Serve frontend
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

function startServer() {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`⚡ BotAlto server on :${PORT}`));
}

process.on('SIGINT', async () => {
  console.log('Shutting down...');
  for (const botId in activeBots) {
    try {
      await activeBots[botId].stop('SIGTERM');
    } catch (_) {}
  }
  await client.close();
  process.exit(0);
});

connectToMongo();
