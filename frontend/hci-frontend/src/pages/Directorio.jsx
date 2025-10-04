import { useEffect, useMemo, useState } from 'react'
import { api } from '../api/client'

export default function Directorio() {
  const [doctores, setDoctores] = useState([])
  const [q, setQ] = useState('')

  useEffect(() => {
    api.get('/doctores').then((res) => setDoctores(res.data || []))
  }, [])

  const grupos = useMemo(() => {
    const map = new Map()
    doctores.forEach((d) => {
      const key = d.especialidad || 'General'
      if (!map.has(key)) map.set(key, [])
      map.get(key).push(d)
    })
    return Array.from(map.entries()) // [ [especialidad, [doctores]] ]
  }, [doctores])

  const filtrar = (list) =>
    list.filter(
      (d) =>
        d.nombre.toLowerCase().includes(q.toLowerCase()) ||
        d.especialidad.toLowerCase().includes(q.toLowerCase())
    )

  return (
    <div className="section">
      <h1>Directorio Médico</h1>
      <div className="searchbar" role="search" style={{ marginBottom: 16 }}>
        <input
          placeholder="Buscar por nombre o especialidad"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button className="btn btn-secondary" onClick={() => {}}>
          Buscar
        </button>
      </div>

      {grupos.map(([esp, docs]) => (
        <div key={esp} style={{ marginBottom: 24 }}>
          <h2 style={{ margin: '12px 0' }}>{esp}</h2>
          <div className="grid grid-3">
            {filtrar(docs).map((d) => (
              <div className="card" key={d.id}>
                <h3 style={{ margin: '0 0 6px' }}>{d.nombre}</h3>
                <p style={{ margin: 0 }}>{d.especialidad}</p>
              </div>
            ))}
            {filtrar(docs).length === 0 && (
              <p>No hay resultados en esta especialidad.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
