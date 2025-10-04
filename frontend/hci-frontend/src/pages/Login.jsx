import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client'
import { setUser } from '../auth'

export default function Login() {
  const [err, setErr] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('') // visual, no se usa en MVP
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErr('Correo inválido')
      return
    }

    try {
      const { data } = await api.get(
        `/pacientes?email=${encodeURIComponent(email)}`
      )
      if (!data) {
        setErr('No existe una cuenta con ese correo')
        return
      }
      setUser(data)
      nav('/citas')
    } catch {
      setErr('No se pudo iniciar sesión')
    }
  }

  return (
    <div className="section">
      <h1 style={{ textAlign: 'center' }}>INICIAR SESIÓN</h1>
      <form className="form" onSubmit={submit}>
        <label>
          Correo
          <input
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Contraseña
          <input
            type="password"
            required
            autoComplete="current-password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </label>
        <button className="btn btn-primary" type="submit">
          Iniciar sesión
        </button>
        {err && (
          <p className="alert" aria-live="assertive" style={{ marginTop: 12 }}>
            {err}
          </p>
        )}
        <p style={{ marginTop: 8 }}>
          ¿Aún no tienes cuenta? <a href="/register">Regístrate</a>
        </p>
      </form>
    </div>
  )
}
