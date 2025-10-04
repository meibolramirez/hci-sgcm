const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

/* --- Helpers de validación --- */
function isValidTime(hhmm) {
  return /^\d{2}:\d{2}$/.test(hhmm)
}
function isFutureOrToday(dateStr) {
  const d = new Date(dateStr)
  const today = new Date(new Date().toDateString()) // 00:00 hoy
  return d >= today
}

/* --- Pacientes --- */
app.get('/api/pacientes', async (_, res) => {
  const data = await prisma.paciente.findMany()
  res.json(data)
})

app.post('/api/pacientes', async (req, res) => {
  const { nombre, email } = req.body
  if (!nombre || !email)
    return res.status(400).json({ error: 'nombre y email requeridos' })
  try {
    const p = await prisma.paciente.create({ data: { nombre, email } })
    res.status(201).json(p)
  } catch (e) {
    res.status(400).json({ error: 'email duplicado o inválido' })
  }
})

// Pacientes (buscar por email ?email=)
app.get('/api/pacientes', async (req, res) => {
  const { email } = req.query
  if (email) {
    const p = await prisma.paciente.findFirst({ where: { email } })
    return res.json(p || null)
  }
  const data = await prisma.paciente.findMany()
  res.json(data)
})

// Paciente por id
app.get('/api/pacientes/:id', async (req, res) => {
  const id = Number(req.params.id)
  const p = await prisma.paciente.findUnique({ where: { id } })
  if (!p) return res.status(404).json({ error: 'No encontrado' })
  res.json(p)
})

/* --- Doctores --- */
app.get('/api/doctores', async (_, res) => {
  const data = await prisma.doctor.findMany()
  res.json(data)
})

/* --- Citas --- */
app.get('/api/citas', async (req, res) => {
  try {
    const { pacienteId } = req.query
    const where = pacienteId ? { pacienteId: Number(pacienteId) } : {}
    const data = await prisma.cita.findMany({
      where,
      include: { paciente: true, doctor: true },
      orderBy: { id: 'desc' },
    })
    res.json(data)
  } catch (e) {
    console.error('GET /api/citas error:', e)
    res.status(500).json({ error: 'Server error' })
  }
})

app.post('/api/citas', async (req, res) => {
  const { pacienteId, doctorId, fecha, hora, motivo } = req.body

  if (!pacienteId || !doctorId || !fecha || !hora)
    return res
      .status(400)
      .json({ error: 'Campos requeridos: pacienteId, doctorId, fecha, hora' })

  if (!isValidTime(hora))
    return res.status(400).json({ error: 'Formato hora HH:MM', field: 'hora' })
  if (!isFutureOrToday(fecha))
    return res.status(400).json({ error: 'Fecha en el pasado', field: 'fecha' })

  try {
    const c = await prisma.cita.create({
      data: { pacienteId, doctorId, fecha: new Date(fecha), hora, motivo },
    })
    res.status(201).json(c)
  } catch (e) {
    res.status(400).json({ error: 'Datos inválidos' })
  }
})

app.put('/api/citas/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { fecha, hora } = req.body

  if (hora && !isValidTime(hora))
    return res.status(400).json({ error: 'Formato hora HH:MM', field: 'hora' })
  if (fecha && !isFutureOrToday(fecha))
    return res.status(400).json({ error: 'Fecha en el pasado', field: 'fecha' })

  const c = await prisma.cita.update({ where: { id }, data: req.body })
  res.json(c)
})

app.delete('/api/citas/:id', async (req, res) => {
  const id = Number(req.params.id)
  await prisma.cita.delete({ where: { id } })
  res.status(204).end()
})

/* --- Arranque --- */
const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`API local → http://localhost:${PORT}`))
