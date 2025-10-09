# 07 — Seguridad

- **Autenticación** por JWT con expiración (ej. 24h). Renovación controlada.
- **Autorización** por rol en middleware (admin/gestor/médico/paciente).
- **Validación** de entradas (celebrate/zod/express-validator).
- **CORS** restringido por entorno.
- **Password** con bcrypt (cost >= 10) y política mínima de complejidad.
- Registro de eventos sensibles (login, cambios de contraseña).
- Protección ante OWASP Top 10 (XSS, SQLi —via ORM—, CSRF si cookies, rate limit).
