# 04 — Datos y ERD (Prisma)

## Entidades principales
- **User** (id, name, email, passwordHash, role)
  - Roles: ADMIN, MANAGER (gestor), DOCTOR, PATIENT
- **Specialty** (id, name, description)
- **Doctor** (id, userId, specialtyId, bio, phone)
- **Patient** (id, userId?, documentId, phone, address)
- **Appointment** (id, patientId, doctorId, dateTime, status, notes)
  - Estados: REQUESTED, CONFIRMED, CANCELED, DONE
- **MedicalNote** (id, appointmentId, diagnosis, indications, attachments[])

> Regla de integridad: evitar solapamiento de citas por (doctorId, dateTime). Índice único condicional.

## Migraciones y seed
```bash
cd backend
npx prisma migrate dev --name init
npm run seed
```
