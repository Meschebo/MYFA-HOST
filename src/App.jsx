import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ToastProvider } from './contexts/ToastContext'

import Navbar from './components/Navbar'
import Toast from './components/Toast'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import BotManager from './pages/BotManager'
import Commands from './pages/Commands'
import Documentation from './pages/Documentation'
import Support from './pages/Support'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Analytics from './pages/Analytics'
import DeploymentGuide from './pages/DeploymentGuide'
import RenderDeploymentGuide from './pages/RenderDeploymentGuide' // New Guide

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          
          <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/documentation" element={<Documentation />} />
              <Route path="/support" element={<Support />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/deployment-guide" element={<DeploymentGuide />} />
              <Route path="/deploy-backend-guide" element={<RenderDeploymentGuide />} /> {/* New Route */}

              {/* Protected Routes */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/bots" element={<ProtectedRoute><BotManager /></ProtectedRoute>} />
              <Route path="/commands/:botId" element={<ProtectedRoute><Commands /></ProtectedRoute>} />
              <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
            </Routes>
          </main>
          
          <footer className="bg-white border-t border-gray-200 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="text-center text-gray-600">
                <p>© {new Date().getFullYear()} BotAlto – Open Source Telegram Bot Platform. Developed with ❤️ by Kaiiddo</p>
              </div>
            </div>
          </footer>
          
          <Toast />
        </div>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App
