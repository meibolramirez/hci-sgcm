import { NavLink, useNavigate } from 'react-router-dom'
import { getUser, logout } from '../auth'

export default function Header() {
  const user = getUser()
  const nav = useNavigate()
  const handleLogout = () => {
    logout()
    nav('/')
  }

  return (
    <header className="site-header" role="banner">
      <nav className="nav" aria-label="Navegación principal">
        <div className="brand">
          <span className="brand-badge" aria-hidden>
            H
          </span>
          <span>CENTRO MEDICO</span>
        </div>
        <div
          role="navigation"
          style={{ display: 'flex', gap: 12, alignItems: 'center' }}
        >
          <NavLink to="/" end>
            Inicio
          </NavLink>
          <NavLink to="/directorio">Directorio Médico</NavLink>
          <NavLink to="/especialidades">Especialidades</NavLink>

          {!user ? (
            <>
              <NavLink to="/login">Iniciar sesión</NavLink>
              <NavLink to="/register">Registrarse</NavLink>
            </>
          ) : (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontWeight: 700 }}>
                Hola, {user.nombre?.split(' ')[0] || 'Paciente'}
              </span>
              <button className="btn btn-secondary" onClick={handleLogout}>
                Salir
              </button>
              <NavLink to="/citas">Mis citas</NavLink>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
