import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Limpiando base de datos...');
  
  // Borramos en orden para respetar la integridad referencial
  await prisma.consultation.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.user.deleteMany();

  console.log('👤 Creando nutriólogo de prueba...');
  
  const testUser = await prisma.user.create({
    data: {
      nombre: 'Uriel',
      apellido: 'Saenz',
      email: 'prueba@nutrias.com',
      password: 'password123',
      telefono: '1234567890',
      carrera: 'Nutrición Clínica',
      fechaNacimiento: new Date('1995-01-01'), // ✅ Cambiado de cumpleaños a fechaNacimiento
      status: 'TEST_USER',
    },
  });

  console.log('✅ Nutriólogo creado:', testUser.email);
  console.log('🏥 Insertando 5 pacientes...');
  
  const patients = Array.from({ length: 5 }).map((_, i) => ({
    expediente: `EXP-00${i + 1}`,
    nombre: `Paciente${i + 1}`,
    apellido: 'Prueba',
    email: `paciente${i + 1}@test.com`,
    nutritionistId: testUser.id,
  }));

  await prisma.patient.createMany({ data: patients });

  console.log('✅ ¡Seeding completado con éxito!');
  console.log(`📊 Total usuarios: 1`);
  console.log(`📊 Total pacientes: 5`);
}

main()
  .catch((e) => {
    console.error('❌ Error fatal en el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });