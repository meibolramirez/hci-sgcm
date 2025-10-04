import axios from 'axios'

// Cambia esta URL si tu backend corre en otro host/puerto
export const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: { 'Content-Type': 'application/json' },
})
