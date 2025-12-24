import axios from 'axios'

import { useAuth } from '@/store/useAuth'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

apiClient.interceptors.request.use((config) => {
    const token = useAuth.getState().getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const currentPath = window.location.pathname
            if (currentPath !== '/login') {
                useAuth.getState().logout()
                window.location.href = '/login'
            }
        }
        return Promise.reject(error)
    }
)

export const API_ENDPOINTS = {
    AUTH_LOGIN: '/Auth/login',
    AUTH_LOGOUT: '/Auth/logout',
    AUTH_REGISTER: '/Auth/register',
}
