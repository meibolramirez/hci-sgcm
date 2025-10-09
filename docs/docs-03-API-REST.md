# 03 — API REST (resumen)

> Prefijo: `/api`

## Auth
- `POST /auth/register` — Crea usuario paciente.
- `POST /auth/login` — Devuelve JWT.
- `POST /auth/logout` — Invalida sesión.

## Usuarios / Roles
- `GET /me` — Perfil autenticado.
- `GET /users` (admin) — Lista usuarios; filtros por rol.
- `PATCH /users/:id` (admin) — Actualiza usuario.
- `DELETE /users/:id` (admin) — Elimina usuario.

## Especialidades y Médicos
- `GET /specialties`
- `POST /specialties` (admin)
- `GET /doctors?specialtyId=...`
- `POST /doctors` (admin)

## Pacientes
- `GET /patients?query=`
- `POST /patients` (gestor/admin)
- `GET /patients/:id` — Incluye historial.
- `PATCH /patients/:id`
- `DELETE /patients/:id` (admin)

## Citas
- `GET /appointments?doctorId=&date=`
- `POST /appointments` — Crea cita.
- `PATCH /appointments/:id` — Reprogramar / cambiar estado.
- `DELETE /appointments/:id` — Cancelar.

### Códigos de estado
- `200 OK`, `201 Created`, `204 No Content`.
- Errores: `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `409 Conflict`, `422 Unprocessable Entity`, `500 Server Error`.

### Convenciones
- JSON camelCase; `createdAt/updatedAt` ISO8601.
- Paginación: `?page=&pageSize=`; cabeceras `X-Total-Count`.
