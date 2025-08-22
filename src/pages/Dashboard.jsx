import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Bot, TerminalSquare, BarChart3, ArrowRight } from 'lucide-react'

const Dashboard = () => {
  const { user } = useAuth()

  const quickLinks = [
    { title: 'Manage Your Bots', description: 'Create, start, stop, and configure your bots.', href: '/bots', icon: Bot, color: 'text-primary-600' },
    { title: 'View Documentation', description: 'Explore our API and learn how to create powerful commands.', href: '/documentation', icon: TerminalSquare, color: 'text-green-600' },
    { title: 'Check Analytics', description: 'Monitor your bot performance and user engagement.', href: '/analytics', icon: BarChart3, color: 'text-yellow-600' },
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">
        Welcome back, {user?.name || 'User'}!
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {quickLinks.map(link => (
          <Link key={link.title} to={link.href} className="card p-0 overflow-hidden">
            <div className="card-body">
              <link.icon className={`h-8 w-8 mb-3 ${link.color}`} />
              <h3 className="font-semibold text-lg text-gray-900">{link.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{link.description}</p>
            </div>
            <div className="bg-gray-50 px-4 py-2 border-t flex justify-end items-center">
              <span className="text-sm font-medium text-primary-600">Go <ArrowRight className="inline h-4 w-4"/></span>
            </div>
          </Link>
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="card">
          <div className="card-body text-center text-gray-500">
            <p>Activity feed coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
