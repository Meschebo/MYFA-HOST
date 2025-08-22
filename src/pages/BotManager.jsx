import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { botAPI } from '../services/api'
import { useToast } from '../contexts/ToastContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Plus, Play, PowerOff, TerminalSquare, Trash2, Loader2 } from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'
import BackendConnectionError from '../components/BackendConnectionError'

const BotManager = () => {
  const [bots, setBots] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newBotName, setNewBotName] = useState('')
  const [newBotToken, setNewBotToken] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { success, error: toastError } = useToast()

  const fetchBots = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await botAPI.getBots()
      setBots(response.data)
    } catch (err) {
      setError(err) // Set the full error object
      toastError("Failed to connect to the server.")
    } finally {
      setLoading(false)
    }
  }, [toastError])

  useEffect(() => {
    fetchBots()
  }, [fetchBots])

  const handleCreateBot = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await botAPI.createBot({ name: newBotName, token: newBotToken })
      success("Bot created successfully!")
      setIsModalOpen(false)
      setNewBotName('')
      setNewBotToken('')
      fetchBots()
    } catch (err) {
      toastError(err.response?.data?.error || "Failed to create bot.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleToggleBot = async (botId, currentStatus) => {
    const action = currentStatus === 'RUN' ? botAPI.stopBot : botAPI.startBot
    const actionText = currentStatus === 'RUN' ? 'stopping' : 'starting'
    try {
      await action(botId)
      success(`Bot ${actionText.slice(0, -3)}ed successfully!`)
      fetchBots()
    } catch (err) {
      toastError(`Failed in ${actionText} the bot.`)
    }
  }

  const handleDeleteBot = async (botId) => {
    if (window.confirm("Are you sure you want to delete this bot? This action cannot be undone.")) {
      try {
        await botAPI.deleteBot(botId)
        success("Bot deleted successfully!")
        fetchBots()
      } catch (err) {
        toastError("Failed to delete bot.")
      }
    }
  }

  if (loading) {
    return <LoadingSpinner message="Fetching your bots..." />
  }

  if (error) {
    return <BackendConnectionError onRetry={fetchBots} />
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Bot Manager</h1>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary">
          <Plus className="h-5 w-5" /> Create New Bot
        </button>
      </div>

      {bots.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg">
          <Bot className="mx-auto h-16 w-16 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No bots found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating your first bot.</p>
          <button onClick={() => setIsModalOpen(true)} className="btn-primary mt-6">
            Create New Bot
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bots.map(bot => (
            <motion.div key={bot.botId} layout className="card">
              <div className="card-header flex justify-between items-center">
                <h3 className="font-semibold text-lg">{bot.name}</h3>
                <span className={`badge ${bot.status === 'RUN' ? 'badge-success' : 'badge-secondary'}`}>
                  {bot.status}
                </span>
              </div>
              <div className="card-body space-y-3">
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => handleToggleBot(bot.botId, bot.status)} className={bot.status === 'RUN' ? 'btn-warning text-sm' : 'btn-success text-sm'}>
                    {bot.status === 'RUN' ? <PowerOff className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    {bot.status === 'RUN' ? 'Stop' : 'Start'}
                  </button>
                  <Link to={`/commands/${bot.botId}`} className="btn-outline text-sm">
                    <TerminalSquare className="h-4 w-4" /> Commands
                  </Link>
                  <button onClick={() => handleDeleteBot(bot.botId)} className="btn-danger text-sm">
                    <Trash2 className="h-4 w-4" /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: -20 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-md"
              onClick={e => e.stopPropagation()}
            >
              <form onSubmit={handleCreateBot}>
                <div className="p-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Create a New Bot</h3>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="botName" className="block text-sm font-medium text-gray-700">Bot Name</label>
                      <input type="text" id="botName" value={newBotName} onChange={e => setNewBotName(e.target.value)} className="input mt-1" placeholder="My Awesome Bot" required />
                    </div>
                    <div>
                      <label htmlFor="botToken" className="block text-sm font-medium text-gray-700">Bot Token</label>
                      <input type="text" id="botToken" value={newBotToken} onChange={e => setNewBotToken(e.target.value)} className="input mt-1" placeholder="From @BotFather" required />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-3 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn-outline">Cancel</button>
                  <button type="submit" className="btn-primary" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                    {isSubmitting ? 'Creating...' : 'Create Bot'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default BotManager
