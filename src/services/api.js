import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Bot Management API
export const botAPI = {
  getBots: () => api.get('/getBots'),
  createBot: (data) => api.post('/createBot', data),
  deleteBot: (botId) => api.post('/deleteBot', { botId }),
  startBot: (botId) => api.post('/startBot', { botId }),
  stopBot: (botId) => api.post('/stopBot', { botId }),
  setToken: (token) => api.post('/setToken', { token }),
}

// Commands API
export const commandsAPI = {
  getCommands: (botId) => api.get(`/getCommands?botId=${botId}`),
  addCommand: (data) => api.post('/addCommand', data),
  deleteCommand: (data) => api.post('/delCommand', data),
  getErrors: (botId) => api.get(`/getErrors?botId=${botId}`),
}

// Authentication API (for future use)
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
}

// Analytics API (for future use)
export const analyticsAPI = {
  getBotStats: (botId) => api.get(`/analytics/bot/${botId}`),
  getOverallStats: () => api.get('/analytics/overview'),
  getCommandUsage: (botId) => api.get(`/analytics/commands/${botId}`),
}

export default api
