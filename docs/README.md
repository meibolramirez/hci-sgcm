# HCI-SGCM - Sistema de Gestión de Citas de Especialidades Médicas

**Repositorio:** `meibolramirez/hci-sgcm`  
**Curso:** BIU CSE6061 – Human-Computer Interaction (Summer 2025)  
**Fecha de cierre doc:** 2025-10-09

Este repositorio implementa un prototipo **de alta fidelidad** de un **sistema de gestión de citas médicas** con enfoque HCI (Human–Computer Interaction). Incluye **frontend** (React + Vite), **backend** (Node.js + Express + Prisma) y **base de datos** (SQLite por defecto; compatible con PostgreSQL).

> **Objetivo docente:** cubrir el caso de estudio definido para CSE661 (HCI), documentando diseño centrado en el usuario, arquitectura, implementación, pruebas, usabilidad, accesibilidad y despliegue.

---

## Estructura

```
backend/               # API REST (Node/Express), ORM (Prisma), seed & migrations
frontend/hci-frontend/ # SPA React (Vite, React Router)
design/                # Wireframes y prototipos (Figma, Axure), capturas
docs/                  # (esta carpeta) documentación completa en Markdown
```

## Guía Rápida

1. **Requisitos**: Node 20+, npm 10+, Git, SQLite 3 (o PostgreSQL), PNPM opcional.
2. **Clonar**:
   ```bash
   git clone https://github.com/meibolramirez/hci-sgcm.git
   cd hci-sgcm
   ```
3. **Backend**:
   ```bash
   cd backend
   cp .env.example .env   # Ajustar DATABASE_URL y JWT_SECRET
   npm ci
   npx prisma generate
   npx prisma migrate dev --name init
   npm run seed           # Carga datos base (especialidades, usuarios demo, etc.)
   npm run dev            # arranca API en http://localhost:3000
   ```
4. **Frontend**:
   ```bash
   cd ../frontend/hci-frontend
   cp .env.example .env   # Ajustar VITE_API_URL (ej: http://localhost:3000)
   npm ci
   npm run dev            # arranca UI en http://localhost:5173
   ```

> **Nota de error común**: Si aparece `The table 'main.Doctor' does not exist`, ejecute:
> ```bash
> cd backend
> npx prisma migrate dev --name init
> npm run seed
> ```
> Esto crea las tablas y datos de prueba.

## Documentación

La documentación completa vive en `docs/` e incluye:
- **01-ALCANCE-HCI.md**: alcance, requisitos funcionales y no funcionales, perfiles, historias de usuario.
- **02-ARQUITECTURA.md**: diagrama lógico, capas, decisiones técnicas, variables de entorno.
- **03-API-REST.md**: rutas, contratos, ejemplos de request/response.
- **04-DATOS-ERD.md**: esquema de BD, entidades y relaciones, reglas de integridad.
- **05-FRONTEND-UI.md**: navegación, vistas, estados vacíos, mensajes de error.
- **06-SEGURIDAD.md**: auth, roles, protección de rutas, validaciones.
- **07-PRUEBAS.md**: pruebas unitarias/manuales, criterios de aceptación.
- **08-USABILIDAD-ACCESIBILIDAD.md**: heurísticas Nielsen, WCAG 2.2 AA, checklist.
- **09-DESPLIEGUE.md**: local, Docker, producción (Render/Fly/Heroku), .env.
- **10-ANEXOS.md**: enlaces a Figma/Axure, capturas, cronograma Gantt y referencias APA.

## Licencia

MIT. Ver `LICENSE`.
