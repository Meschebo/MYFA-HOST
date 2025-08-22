import React from 'react'
import { Link } from 'react-router-dom'
import { Unplug, BookOpen, RefreshCw } from 'lucide-react'

const BackendConnectionError = ({ onRetry }) => {
  return (
    <div className="text-center py-10 card bg-yellow-50 border-yellow-200">
      <div className="card-body">
        <Unplug className="mx-auto h-12 w-12 text-yellow-500" />
        <h2 className="mt-4 text-2xl font-bold text-yellow-800">Could Not Connect to Server</h2>
        <p className="mt-2 text-yellow-700 max-w-2xl mx-auto">
          This is expected if you've deployed to Netlify but haven't deployed your backend yet.
          Your live frontend needs a live backend to connect to.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link to="/deployment-guide" className="btn-primary w-full sm:w-auto">
            <BookOpen className="h-4 w-4" /> View Deployment Guide
          </Link>
          <button onClick={onRetry} className="btn-outline w-full sm:w-auto">
            <RefreshCw className="h-4 w-4" /> Try Again
          </button>
        </div>
      </div>
    </div>
  )
}

export default BackendConnectionError
