# 10 — Despliegue

## Local (desarrollo)
Ver `README.md`.

## Docker (sugerido)
```
# Backend
docker build -t sgcm-api ./backend
docker run -p 3000:3000 --env-file backend/.env sgcm-api

# Frontend
docker build -t sgcm-web ./frontend/hci-frontend
docker run -p 5173:5173 --env-file frontend/hci-frontend/.env sgcm-web
```

## Producción (ejemplos)
- Render/Fly/Heroku para API Node + Postgres gestionado.
- Netlify/Vercel para frontend; configurar `VITE_API_URL` público.
- Variables seguras y migrations en el pipeline; correr `prisma migrate deploy`.
