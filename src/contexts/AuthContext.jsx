import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('auth_token')
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (credentials) => {
    try {
      // For demo purposes, we'll use a mock login
      if (credentials.email === 'demo@botalto.com' && credentials.password === 'demo123') {
        const mockUser = {
          id: '1',
          name: 'Demo User',
          email: 'demo@botalto.com',
          avatar: null,
          role: 'admin',
          joinedAt: new Date().toISOString(),
        }
        
        const mockToken = 'demo_token_' + Date.now()
        
        localStorage.setItem('user', JSON.stringify(mockUser))
        localStorage.setItem('auth_token', mockToken)
        setUser(mockUser)
        
        return { success: true, user: mockUser }
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      throw new Error(error.message || 'Login failed')
    }
  }

  const register = async (userData) => {
    try {
      // Mock registration
      const mockUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        avatar: null,
        role: 'user',
        joinedAt: new Date().toISOString(),
      }
      
      const mockToken = 'token_' + Date.now()
      
      localStorage.setItem('user', JSON.stringify(mockUser))
      localStorage.setItem('auth_token', mockToken)
      setUser(mockUser)
      
      return { success: true, user: mockUser }
    } catch (error) {
      throw new Error(error.message || 'Registration failed')
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('auth_token')
    setUser(null)
  }

  const updateProfile = (userData) => {
    const updatedUser = { ...user, ...userData }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    setUser(updatedUser)
  }

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    loading,
    isAuthenticated: !!user,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
