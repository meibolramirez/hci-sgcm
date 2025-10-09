# 01 — Alcance, requisitos y perfiles (HCI)

**Caso de estudio:** Gestión de citas de especialidades médicas (consultas externas y pruebas diagnósticas).  
**Enfoque:** Diseño e implementación centrados en HCI (usabilidad, accesibilidad, UX, ergonomía).

## 1.1 Objetivos
- Permitir a **pacientes** descubrir especialidades, registrarse, autenticarse y **agendar/gestionar** citas.
- Proveer a **médicos** una vista de su agenda, acceso a historias clínicas y registro de atenciones.
- Habilitar a **gestores** la **creación** y consulta de citas y la gestión de pacientes.
- Permitir a **administradores** administrar **especialidades, médicos, pacientes y gestores**.
- Enviar **recordatorios** y alertas, y generar **reportes** (por paciente, médico y especialidad).

## 1.2 Requisitos (resumen)

### Funcionales
1. Registro/Inicio de sesión (paciente, médico, gestor, admin).
2. ABM/CRUD de pacientes, médicos, especialidades.
3. **Agenda** de citas por especialidad/médico, con vista calendario.
4. **Historial** de citas (diagnóstico, indicaciones, adjuntos).
5. **Recordatorios** (email/SMS) previos a la cita.
6. **Reportes** por paciente/médico/especialidad.
7. Paneles diferenciados por rol y permisos.

### No funcionales
- **Usabilidad** (heurísticas Nielsen), **accesibilidad** (WCAG 2.2 AA), **rendimiento** (TTI < 3s en desktop), **seguridad** (OWASP Top 10), **auditoría** básica (timestamps, usuario).
- Mantenibilidad (capas separadas, tipado JSDoc), trazabilidad (issue tracker, commits), portabilidad (Docker).

## 1.3 Perfiles y permisos
- **Paciente**: registrarse, ver/crear/cancelar sus citas, ver historial propio.
- **Médico**: ver agenda propia, confirmar/actualizar atenciones, registrar notas clínicas.
- **Gestor**: crear citas para pacientes, gestionar datos de pacientes/médicos, **solo lectura** sobre agendas.
- **Administrador**: todo lo anterior + ABM de especialidades, usuarios y configuración.

## 1.4 Historias de usuario (muestra)
- *Como paciente*, quiero poder **filtrar por especialidad** para encontrar un médico disponible **esta semana** y **recibir un recordatorio** 24h antes.
- *Como médico*, necesito **ver mi agenda diaria** y marcar una cita como **atendida** registrando diagnósticos.
- *Como gestor*, debo poder **crear** una cita para un paciente **nuevo** en una llamada telefónica.
- *Como administrador*, deseo **agregar una nueva especialidad** y **asignar** médicos a la misma.
