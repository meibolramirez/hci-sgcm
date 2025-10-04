import { Link } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import { api } from '../api/client'

export default function Home() {
  const [doctores, setDoctores] = useState([])
  const scroller = useRef(null)

  useEffect(() => {
    api.get('/doctores').then((res) => setDoctores(res.data || []))
  }, [])
  const especialidades = useMemo(() => {
    const set = new Set(doctores.map((d) => d.especialidad))
    return Array.from(set)
  }, [doctores])

  const scrollBy = (px) =>
    scroller.current?.scrollBy({ left: px, behavior: 'smooth' })

  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <h1>CONTAMOS CON UN AMPLIO DIRECTORIO DE ESPECIALISTAS</h1>
          <p>Tu salud en manos expertas</p>
          <div className="searchbar" role="search">
            <input
              placeholder="Buscar especialidad o médico"
              aria-label="Buscar"
            />
            <button className="btn btn-secondary">Buscar</button>
          </div>
        </div>
      </section>

      {/* Carrusel de especialidades */}
      <div className="section">
        <h2>Servicios / Especialidades</h2>
        <div style={{ position: 'relative' }}>
          <button
            className="btn btn-secondary"
            style={{ position: 'absolute', left: 0, top: '40%', zIndex: 2 }}
            onClick={() => scrollBy(-300)}
          >
            ◀
          </button>
          <div
            ref={scroller}
            style={{
              display: 'flex',
              gap: 16,
              overflowX: 'auto',
              scrollBehavior: 'smooth',
              padding: '8px 40px',
            }}
          >
            {especialidades.map((esp, i) => (
              <div key={i} className="card" style={{ minWidth: 220 }}>
                <div
                  style={{
                    height: 100,
                    background: '#e6f1f7',
                    borderRadius: 10,
                    marginBottom: 8,
                  }}
                  aria-hidden
                />
                <h3 style={{ margin: '0 0 6px' }}>{esp}</h3>
                <p style={{ margin: 0 }}>Consulta a nuestros especialistas</p>
              </div>
            ))}
            {especialidades.length === 0 && (
              <p>No hay especialidades registradas aún.</p>
            )}
          </div>
          <button
            className="btn btn-secondary"
            style={{ position: 'absolute', right: 0, top: '40%', zIndex: 2 }}
            onClick={() => scrollBy(300)}
          >
            ▶
          </button>
        </div>
      </div>

      <div
        className="section grid"
        style={{ gridTemplateColumns: '2fr 1fr', gap: '24px' }}
      >
        <div className="grid grid-3">
          {[1, 2, 3].map((i) => (
            <div className="card" key={i}>
              <div
                style={{
                  height: 120,
                  background: '#e6f1f7',
                  borderRadius: 10,
                  marginBottom: 8,
                }}
                aria-hidden
              />
              <h3>Servicio {i}</h3>
              <p>Descripción breve del servicio.</p>
            </div>
          ))}
        </div>
        <aside className="panel">
          <h2>
            Regístrate como paciente y toma el control de tu historia clínica
          </h2>
          <Link to="/register" className="btn btn-primary">
            Haz tu cita
          </Link>
        </aside>
      </div>
    </>
  )
}
