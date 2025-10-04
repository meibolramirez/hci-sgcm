import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client'
import { setUser } from '../auth'

export default function Register() {
  const [msg, setMsg] = useState(null)
  const [err, setErr] = useState('')
  const [form, setForm] = useState({
    tipoDoc: '',
    doc: '',
    nombre: '',
    email: '',
    pass: '',
    pass2: '',
  })
  const nav = useNavigate()

  const required = (v) => String(v || '').trim().length > 0
  const isEmail = (v) => /^\S+@\S+\.\S+$/.test(v || '')

  const onSubmit = async (e) => {
    e.preventDefault()
    setErr('')
    setMsg(null)
    // Validaciones accesibles
    if (
      !required(form.tipoDoc) ||
      !required(form.doc) ||
      !required(form.nombre) ||
      !required(form.email) ||
      !required(form.pass) ||
      !required(form.pass2)
    ) {
      setErr('Completa los campos requeridos.')
      return
    }
    if (!isEmail(form.email)) {
      setErr('Correo inválido.')
      return
    }
    if (form.pass.length < 6) {
      setErr('La contraseña debe tener al menos 6 caracteres.')
      return
    }
    if (form.pass !== form.pass2) {
      setErr('Las contraseñas no coinciden.')
      return
    }

    try {
      // Crea el paciente (password no se persiste en este MVP)
      const res = await api.post('/pacientes', {
        nombre: form.nombre,
        email: form.email,
      })
      // Inicia sesión automática
      setUser(res.data)
      // Redirige a inicio o a citas (elige una; pides inicio, aquí → inicio)
      nav('/')
    } catch (e) {
      const m = e?.response?.data?.error || 'No se pudo crear la cuenta.'
      setErr(m)
    }
  }

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  return (
    <div className="section">
      <h1 style={{ textAlign: 'center' }}>REGISTRARME</h1>
      <form className="form" onSubmit={onSubmit} aria-describedby="regHint">
        <div
          className="grid"
          style={{ gridTemplateColumns: '1fr 1fr', gap: '16px' }}
        >
          <label>
            Tipo de documento{' '}
            <span aria-hidden="true" style={{ color: '#b00' }}>
              *
            </span>
            <select required value={form.tipoDoc} onChange={set('tipoDoc')}>
              <option value="">Seleccionar…</option>
              <option>Cédula</option>
              <option>Pasaporte</option>
            </select>
          </label>
          <label>
            No. de documento{' '}
            <span aria-hidden="true" style={{ color: '#b00' }}>
              *
            </span>
            <input required value={form.doc} onChange={set('doc')} />
          </label>
          <label>
            Nombres y Apellidos{' '}
            <span aria-hidden="true" style={{ color: '#b00' }}>
              *
            </span>
            <input required value={form.nombre} onChange={set('nombre')} />
          </label>
          <label>
            Correo{' '}
            <span aria-hidden="true" style={{ color: '#b00' }}>
              *
            </span>
            <input
              type="email"
              required
              value={form.email}
              onChange={set('email')}
              aria-describedby="emailHelp"
            />
            <small id="emailHelp">Ej.: nombre@dominio.com</small>
          </label>
          <label>
            Contraseña{' '}
            <span aria-hidden="true" style={{ color: '#b00' }}>
              *
            </span>
            <input
              type="password"
              required
              minLength={6}
              value={form.pass}
              onChange={set('pass')}
            />
          </label>
          <label>
            Confirmar contraseña{' '}
            <span aria-hidden="true" style={{ color: '#b00' }}>
              *
            </span>
            <input
              type="password"
              required
              minLength={6}
              value={form.pass2}
              onChange={set('pass2')}
            />
          </label>
        </div>

        <div
          style={{
            marginTop: 16,
            display: 'flex',
            gap: 12,
            alignItems: 'center',
          }}
        >
          <button className="btn btn-primary" type="submit">
            Registrarme
          </button>
          <span>
            ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
          </span>
        </div>

        {err && (
          <p
            id="regHint"
            className="alert"
            aria-live="assertive"
            style={{ marginTop: 12 }}
          >
            {err}
          </p>
        )}
        {msg && (
          <p className="alert" aria-live="polite" style={{ marginTop: 12 }}>
            {msg}
          </p>
        )}
      </form>
    </div>
  )
}
