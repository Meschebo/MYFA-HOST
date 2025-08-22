import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { Bot, Zap, Shield, Code2, BarChart3, Users, ArrowRight } from 'lucide-react'

const Home = () => {
  const { isAuthenticated } = useAuth()

  const features = [
    { icon: Bot, title: 'Multi-Bot Management', description: 'Host and control multiple Telegram bots from a single dashboard.' },
    { icon: Code2, title: 'Custom Commands', description: 'Create and edit bot commands with JavaScript using our built-in editor.' },
    { icon: Zap, title: 'Real-time Control', description: 'Start/stop bots instantly with live status updates and hot command reloading.' },
    { icon: BarChart3, title: 'Analytics Dashboard', description: 'Track bot performance, command usage, and user engagement metrics.' },
    { icon: Shield, title: 'Secure & Reliable', description: 'Enterprise-grade security with MongoDB persistence and error tracking.' },
    { icon: Users, title: 'Developer Friendly', description: 'Comprehensive API, documentation, and a modern tech stack.' },
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-16"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          The Ultimate <span className="text-primary-600">Telegram Bot</span><br /> Hosting Platform
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
          Create, manage, and deploy powerful Telegram bots with ease. BotAlto provides a beautiful dashboard, custom command editor, and real-time controls.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to={isAuthenticated ? "/dashboard" : "/signup"} className="btn-primary text-lg">
            Get Started for Free <ArrowRight className="h-5 w-5" />
          </Link>
          <Link to="/documentation" className="btn-outline text-lg">
            Read Docs
          </Link>
        </div>
      </motion.section>

      {/* Features Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose BotAlto?</h2>
          <p className="mt-2 text-gray-600">Everything you need to build and scale your bot empire.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card"
            >
              <div className="card-body text-center">
                <div className="mx-auto bg-primary-100 text-primary-600 rounded-full h-12 w-12 flex items-center justify-center">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
