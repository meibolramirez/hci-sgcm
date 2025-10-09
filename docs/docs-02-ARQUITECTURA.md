# 02 — Arquitectura y decisiones técnicas

## 2.1 Stack
- **Frontend**: React 18 + Vite + React Router + Fetch API.
- **Backend**: Node.js 20 + Express + Prisma ORM.
- **BD**: SQLite (desarrollo) / PostgreSQL (producción).
- **Auth**: JWT (cookies httpOnly o Authorization Bearer).
- **Estilos**: CSS Modules/Tailwind opcional.
- **Calendario**: vista mensual/semanal (librería o implementación propia).

## 2.2 Variables de entorno

**backend/.env**:
```
DATABASE_URL="file:./dev.db"          # ó postgres://user:pass@host:port/db
JWT_SECRET="cambia-esta-clave"
PORT=3000
CORS_ORIGIN=http://localhost:5173
```

**frontend/hci-frontend/.env**
```
VITE_API_URL=http://localhost:3000
```

## 2.3 Flujo alto nivel
1. Usuario se autentica (POST /auth/login) → recibe JWT.
2. Frontend guarda sesión (cookie httpOnly o memory) y navega al panel según rol.
3. CRUDs y vistas consumen API REST protegida con middleware de autorización.
4. Prisma gestiona esquema, migraciones y **seed**.

## 2.4 Scripts útiles
```bash
# Backend
npm run dev          # nodemon
npm run build        # transpile
npm run start        # producción
npm run seed         # carga datos demo

# Frontend
npm run dev
npm run build
npm run preview
```

## 2.5 Decisiones HCI
- **Consistencia** de patrones (botones primarios, feedback inmediato).
- **Estados vacíos** con llamadas a la acción claras.
- **Validación** inline, mensajes en lenguaje no técnico.
- **Accesibilidad**: foco visible, navegación por teclado, etiquetas/aria, contraste.
