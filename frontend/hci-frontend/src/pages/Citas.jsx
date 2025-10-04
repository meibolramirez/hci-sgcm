import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client'
import { getUser, setUser as persistUser } from '../auth'

// Utilidad con timeout para evitar spinners infinitos
function withTimeout(promise, ms = 8000) {
  let t
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      t = setTimeout(() => reject(new Error('timeout')), ms)
    }),
  ]).finally(() => clearTimeout(t))
}

export default function Citas() {
  const stored = getUser() // lo que haya en localStorage
  const [user, setUser] = useState(stored) // estado local “reparable”
  const nav = useNavigate()

  const [citas, setCitas] = useState([])
  const [doctores, setDoctores] = useState([])
  const [form, setForm] = useState({
    doctorId: '',
    fecha: '',
    hora: '',
    motivo: '',
  })
  const [toast, setToast] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // 1) Proteger ruta: si no hay sesión, ir a login
  useEffect(() => {
    if (!user) nav('/login')
  }, [user, nav])

  // 2) Autorremediar: si el user no tiene id pero sí email, lo resolvemos contra la API y actualizamos localStorage
  useEffect(() => {
    ;(async () => {
      try {
        if (user && !user.id && user.email) {
          const { data } = await withTimeout(
            api.get(`/pacientes?email=${encodeURIComponent(user.email)}`)
          )
          if (data?.id) {
            persistUser(data) // guarda {id, nombre, email} en localStorage
            setUser(data) // actualiza en memoria
          }
        }
      } catch (e) {
        console.warn('[Citas] no se pudo autorremediar el usuario:', e)
      }
    })()
  }, [user])

  // 3) Carga secuencial y a prueba de fallos (siempre apaga loading)
  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      // doctores
      const d = await withTimeout(api.get('/doctores'))
      setDoctores(Array.isArray(d.data) ? d.data : [])
    } catch (err) {
      console.error('[Citas] doctores error:', err)
      setError('No se pudo cargar el directorio de doctores.')
    }

    try {
      // citas del paciente (solo si tenemos id)
      if (!user?.id) throw new Error('missing-user-id')
      const c = await withTimeout(api.get(`/citas?pacienteId=${user.id}`))
      setCitas(Array.isArray(c.data) ? c.data : [])
    } catch (err) {
      console.error('[Citas] citas error:', err)
      const msg =
        err?.message === 'missing-user-id'
          ? 'La sesión no está completa. Cierra sesión e inicia nuevamente.'
          : 'No se pudieron cargar tus citas.'
      setError((prev) => prev || msg)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (user) load()
  }, [user, load])

  // 4) Crear / Eliminar
  const crear = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (!user?.id) throw new Error('missing-user-id')
      await withTimeout(api.post('/citas', { ...form, pacienteId: user.id }))
      setForm({ doctorId: '', fecha: '', hora: '', motivo: '' })
      setToast('Cita creada correctamente')
      load()
      setTimeout(() => setToast(''), 2000)
    } catch (err) {
      console.error('[Citas] crear error:', err)
      const msg =
        err?.message === 'missing-user-id'
          ? 'La sesión no está completa. Cierra sesión e inicia nuevamente.'
          : err?.response?.data?.error || 'Error al crear la cita'
      setError(msg)
    }
  }

  const eliminar = async (id) => {
    try {
      await withTimeout(api.delete(`/citas/${id}`))
      setToast('Cita eliminada')
      load()
      setTimeout(() => setToast(''), 2000)
    } catch (err) {
      console.error('[Citas] eliminar error:', err)
      setError('No se pudo eliminar')
    }
  }

  if (!user) return null

  return (
    <div
      className="section grid"
      style={{ gridTemplateColumns: '1fr', gap: '24px' }}
    >
      <h1>Mis Citas Médicas</h1>

      <form className="form" onSubmit={crear} noValidate>
        <div
          className="grid"
          style={{ gridTemplateColumns: '1fr 1fr', gap: '16px' }}
        >
          <label>
            Médico{' '}
            <span aria-hidden="true" style={{ color: '#b00' }}>
              *
            </span>
            <select
              required
              value={form.doctorId}
              onChange={(e) =>
                setForm({ ...form, doctorId: Number(e.target.value) })
              }
            >
              <option value="">Selecciona…</option>
              {doctores.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nombre} — {d.especialidad}
                </option>
              ))}
            </select>
          </label>
          <label>
            Fecha{' '}
            <span aria-hidden="true" style={{ color: '#b00' }}>
              *
            </span>
            <input
              type="date"
              required
              value={form.fecha}
              onChange={(e) => setForm({ ...form, fecha: e.target.value })}
            />
          </label>
          <label>
            Hora{' '}
            <span aria-hidden="true" style={{ color: '#b00' }}>
              *
            </span>
            <input
              type="time"
              required
              value={form.hora}
              onChange={(e) => setForm({ ...form, hora: e.target.value })}
            />
          </label>
          <label style={{ gridColumn: '1 / -1' }}>
            Motivo
            <input
              value={form.motivo}
              onChange={(e) => setForm({ ...form, motivo: e.target.value })}
            />
          </label>
        </div>
        <button className="btn btn-primary" type="submit">
          Crear
        </button>
        {error && (
          <p className="alert" aria-live="assertive" style={{ marginTop: 12 }}>
            {error}
          </p>
        )}
      </form>

      <div className="card">
        <h2>Mis citas</h2>
        {loading ? (
          <p>Cargando…</p>
        ) : (
          <table className="table" role="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Doctor</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Motivo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {citas.length === 0 ? (
                <tr>
                  <td colSpan="6">No tienes citas registradas.</td>
                </tr>
              ) : (
                citas.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>
                      {c.doctor?.nombre} — {c.doctor?.especialidad}
                    </td>
                    <td>{new Date(c.fecha).toLocaleDateString()}</td>
                    <td>{c.hora}</td>
                    <td>{c.motivo || '-'}</td>
                    <td className="row-actions">
                      <button
                        className="btn btn-secondary"
                        onClick={() => eliminar(c.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {toast && (
        <div className="toast" role="status" aria-live="assertive">
          {toast}
        </div>
      )}
    </div>
  )
}
