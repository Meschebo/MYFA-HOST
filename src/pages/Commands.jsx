import React, { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { commandsAPI } from '../services/api'
import { useToast } from '../contexts/ToastContext'
import { motion } from 'framer-motion'
import { Save, Trash2, Plus, ArrowLeft, Loader2, Terminal, AlertTriangle } from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'
import BackendConnectionError from '../components/BackendConnectionError'

const Commands = () => {
  const { botId } = useParams()
  const [commands, setCommands] = useState({})
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingCommand, setEditingCommand] = useState(null)
  const [cmdName, setCmdName] = useState('')
  const [cmdCode, setCmdCode] = useState('')
  const { success, error: toastError } = useToast()

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [cmdRes, errRes] = await Promise.all([
        commandsAPI.getCommands(botId),
        commandsAPI.getErrors(botId)
      ])
      setCommands(cmdRes.data)
      setErrors(errRes.data)
    } catch (err) {
      setError(err)
      toastError("Failed to fetch bot data.")
    } finally {
      setLoading(false)
    }
  }, [botId, toastError])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleSaveCommand = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      if (editingCommand && editingCommand !== cmdName) {
        await commandsAPI.deleteCommand({ botId, name: editingCommand })
      }
      await commandsAPI.addCommand({ botId, name: cmdName, code: cmdCode })
      success(`Command /${cmdName} saved successfully!`)
      setCmdName('')
      setCmdCode('')
      setEditingCommand(null)
      fetchData()
    } catch (err) {
      toastError(err.response?.data?.error || "Failed to save command.")
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleDeleteCommand = async (name) => {
    if (window.confirm(`Are you sure you want to delete /${name}?`)) {
      try {
        await commandsAPI.deleteCommand({ botId, name })
        success(`Command /${name} deleted.`)
        if (editingCommand === name) {
            setCmdName('')
            setCmdCode('')
            setEditingCommand(null)
        }
        fetchData()
      } catch (err) {
        toastError("Failed to delete command.")
      }
    }
  }

  const startEdit = (name, code) => {
    setEditingCommand(name)
    setCmdName(name)
    setCmdCode(code)
    document.getElementById('editor-section').scrollIntoView({ behavior: 'smooth' });
  }

  if (loading) return <LoadingSpinner message="Loading commands..." />
  if (error) return <BackendConnectionError onRetry={fetchData} />

  return (
    <div>
      <Link to="/bots" className="btn-outline mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Bot Manager
      </Link>

      {/* Editor Section */}
      <div id="editor-section" className="card mb-8">
        <form onSubmit={handleSaveCommand}>
          <div className="card-header">
            <h2 className="text-xl font-bold">{editingCommand ? `Editing /${editingCommand}` : 'Add New Command'}</h2>
          </div>
          <div className="card-body space-y-4">
            <div>
              <label htmlFor="cmdName" className="block text-sm font-medium text-gray-700">Command Name (without /)</label>
              <input id="cmdName" value={cmdName} onChange={e => setCmdName(e.target.value.replace(/\s/g, ''))} className="input mt-1" required placeholder="greet" />
            </div>
            <div>
              <label htmlFor="cmdCode" className="block text-sm font-medium text-gray-700">JavaScript Code</label>
              <textarea id="cmdCode" value={cmdCode} onChange={e => setCmdCode(e.target.value)} className="textarea mt-1 font-mono text-sm" rows="8" required placeholder="ctx.reply('Hello, world!');"></textarea>
            </div>
          </div>
          <div className="card-footer bg-gray-50 flex justify-end gap-3">
            {editingCommand && <button type="button" onClick={() => { setCmdName(''); setCmdCode(''); setEditingCommand(null); }} className="btn-outline">Cancel Edit</button>}
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {editingCommand ? 'Update Command' : 'Save Command'}
            </button>
          </div>
        </form>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Commands List */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Existing Commands</h2>
          {Object.keys(commands).length === 0 ? (
            <div className="text-center py-10 border-2 border-dashed rounded-lg">
              <Terminal className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium">No commands yet</h3>
              <p className="text-sm text-gray-500">Add your first command above.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(commands).map(([name, code]) => (
                <motion.div layout key={name} className="card">
                  <div className="card-header flex justify-between items-center">
                    <h3 className="font-mono font-semibold">/{name}</h3>
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(name, code)} className="btn-outline text-sm p-2 h-8 w-8"><span className="sr-only">Edit</span><Plus className="h-4 w-4 rotate-45" /></button>
                      <button onClick={() => handleDeleteCommand(name)} className="btn-danger text-sm p-2 h-8 w-8"><span className="sr-only">Delete</span><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                  <div className="card-body">
                    <pre className="bg-gray-100 p-3 rounded-md text-xs overflow-x-auto"><code>{code}</code></pre>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Errors List */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Errors</h2>
          {errors.length === 0 ? (
            <div className="text-center py-10 border-2 border-dashed rounded-lg">
              <div className="mx-auto h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">✓</div>
              <h3 className="mt-2 text-lg font-medium">No errors found</h3>
              <p className="text-sm text-gray-500">Your bot is running smoothly!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {errors.map(err => (
                <div key={err._id} className="card bg-red-50 border-red-200">
                  <div className="card-body">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-red-800">Error in /{err.command}</p>
                        <p className="text-sm text-red-700 font-mono break-all">{err.message}</p>
                        <p className="text-xs text-red-600 mt-1">{new Date(err.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Commands
