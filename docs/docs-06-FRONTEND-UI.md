# 06 — Frontend UI (React)

## Navegación
- **Pública**: Inicio (servicios, especialidades), Registro, Login.
- **Paciente**: Dashboard, Mis Citas (lista + calendario), Nueva Cita, Perfil.
- **Médico**: Agenda del día, Pacientes atendidos, Detalle cita + nota clínica.
- **Gestor**: Panel de gestión (crear citas), Búsqueda de pacientes, Reportes rápidos.
- **Admin**: Especialidades, Médicos, Pacientes, Gestores (CRUD).

## Pautas de UI
- Botón primario para CTA; secundarios para acciones neutras.
- Confirmaciones no intrusivas (toasts) y estados de carga vacíos.
- Errores con explicación y acción de recuperación (p. ej., reintentar).

## Acceso por URL directa
- `/admin`, `/medico`, `/gestion` requieren auth y rol válido.
