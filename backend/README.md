# API – Sistema de Citas (SQLite local)

Base URL: `http://localhost:4000`

## Pacientes

- `GET /api/pacientes` → 200 `[ ... ]`
- `POST /api/pacientes` Body: `{ "nombre": "Ana", "email": "ana@example.com" }`

## Doctores

- `GET /api/doctores` → 200 `[ ... ]`

## Citas

- `GET /api/citas` → 200 `[ { id, paciente, doctor, fecha, hora, motivo, estado } ]`
- `POST /api/citas`

```json
{
  "pacienteId": 1,
  "doctorId": 2,
  "fecha": "2025-12-01",
  "hora": "10:30",
  "motivo": "Chequeo"
}
```
