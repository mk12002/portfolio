import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  fallbackProfile,
  fallbackResume,
  fallbackProjects,
  fallbackExperiences,
  fallbackCertificates,
  fallbackEvents,
  fallbackPublications,
  fallbackContactInfo,
  fallbackBuyMeACoffee,
  fallbackReads,
  fallbackPosts,
} from '../data/fallbackData'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000 // 5-second timeout — fall back to static data if exceeded
})

/**
 * Generic hook: tries API, falls back to static data on error/timeout.
 * Guarantees the site always renders even without the backend.
 */
function useApiWithFallback(endpoint, fallbackData) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.get(endpoint)
      .then(res => setData(res.data))
      .catch(() => {
        // Silently fall back — no console errors for recruiters
        setData(fallbackData)
      })
      .finally(() => setLoading(false))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error }
}

export function useProfile() {
  return useApiWithFallback('/profile', fallbackProfile)
}

export function useResume() {
  return useApiWithFallback('/resume', fallbackResume)
}

export function useProjects() {
  return useApiWithFallback('/projects', fallbackProjects)
}

export function useExperiences() {
  return useApiWithFallback('/experiences', fallbackExperiences)
}

export function useCertificates() {
  return useApiWithFallback('/certificates', fallbackCertificates)
}

export function useEvents() {
  return useApiWithFallback('/events', fallbackEvents)
}

export function usePublications() {
  return useApiWithFallback('/publications', fallbackPublications)
}

export function useContactInfo() {
  return useApiWithFallback('/contact-info', fallbackContactInfo)
}

export function useBuyMeACoffee() {
  return useApiWithFallback('/buymeacoffee', fallbackBuyMeACoffee)
}

export function useReads() {
  return useApiWithFallback('/reads', fallbackReads)
}

export function usePosts() {
  return useApiWithFallback('/posts', fallbackPosts)
}

export async function submitContactForm(data) {
  const response = await api.post('/contact', data)
  return response.data
}

export default api
