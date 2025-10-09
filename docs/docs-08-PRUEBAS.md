# 08 — Pruebas y criterios de aceptación

## Manuales (muestra de casos)
- **Registro paciente** → email único, validaciones, login posterior.
- **Crear cita** → selección de especialidad → médico → fecha/hora disponible → confirmación.
- **Evitar solapes** → agendar misma hora con mismo médico debe fallar 409.
- **Roles** → gestor no puede borrar usuarios; admin sí.
- **Historial** → ver notas clínicas del propio paciente.

## Criterios de aceptación (ejemplo)
- Como paciente, puedo crear una cita exitosa **si** existen cupos; el sistema muestra **confirmación** y envía recordatorio.
- Como médico, marco cita “Done” y **obligatoriamente** registro diagnóstico/indicaciones.

## Automatizables (sugerencia)
- Unitarias (servicios/validaciones), integración (rutas protegidas), e2e (Playwright).
