const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Limpieza rápida para evitar duplicados en re-seeds
  await prisma.cita.deleteMany()
  await prisma.doctor.deleteMany()
  await prisma.paciente.deleteMany()

  // Doctores de ejemplo
  await prisma.doctor.createMany({
    data: [
      { nombre: 'Dra. López', especialidad: 'Cardiología' },
      { nombre: 'Dr. Pérez', especialidad: 'Dermatología' },
      { nombre: 'Dra. Martínez', especialidad: 'Pediatría' },
    ],
  })

  // Pacientes de ejemplo (email es UNIQUE)
  await prisma.paciente.createMany({
    data: [
      { nombre: 'Ana Gómez', email: 'ana@example.com' },
      { nombre: 'Luis Rivas', email: 'luis@example.com' },
      { nombre: 'Carlos Peña', email: 'carlos@example.com' },
    ],
  })

  console.log('Seed ejecutado con éxito')
}

main()
  .catch((e) => {
    console.error('Error en seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
