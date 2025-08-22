import React from 'react';

const Documentation = () => {
  const examples = [
    { title: 'Basic Greeting', code: "ctx.reply('Hello 👋, welcome to BotAlto!');" },
    { title: 'User Info', code: "ctx.replyWithMarkdown(`*User Info*:\\n- ID: ${ctx.from.id}\\n- Name: ${ctx.from.first_name}\\n- Username: @${ctx.from.username || 'none'}`);" },
    { title: 'Send Image', code: "ctx.replyWithPhoto({ url: 'https://picsum.photos/600/400' }, { caption: '🖼️ Random image via BotAlto' });" },
    { title: 'Inline Keyboard Menu', code: "ctx.reply('Choose an option:', { reply_markup: { inline_keyboard: [[{ text: '🔔 Notify me', callback_data: 'notify' }], [{ text: '❓ Help', callback_data: 'help' }]] } });" },
    { title: 'Dice Roll', code: "ctx.replyWithDice();" }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Documentation</h1>
      <p className="text-lg text-gray-600 mb-8">Learn how to create powerful commands for your Telegram bots using the Telegraf context (`ctx`).</p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">The `ctx` Object</h2>
          <p className="text-gray-700 mb-4">The `ctx` (context) object is the heart of every command. It contains information about the incoming message and methods to reply. Here are some of the most useful properties:</p>
          <ul className="list-disc list-inside bg-gray-100 p-4 rounded-lg space-y-2">
            <li><code>ctx.from</code>: Information about the user who sent the message.</li>
            <li><code>ctx.chat</code>: Information about the chat where the message was sent.</li>
            <li><code>ctx.message</code>: The full message object from Telegram.</li>
            <li><code>ctx.reply()</code>: A simple method to send a text message back.</li>
            <li><code>ctx.replyWithPhoto()</code>, <code>ctx.replyWithVideo()</code>, etc: Methods to send various types of media.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Command Examples</h2>
          <div className="space-y-6">
            {examples.map((example) => (
              <div key={example.title} className="card">
                <div className="card-header">
                  <h3 className="font-semibold text-lg">{example.title}</h3>
                </div>
                <div className="card-body">
                  <pre className="bg-gray-800 text-white p-4 rounded-md text-sm overflow-x-auto">
                    <code>{example.code}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Documentation;
