import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'contacto@nutrias.com.mx' },
    update: {},
    create: {
      nombre: 'Uriel',
      apellido: 'Saenz',
      email: 'contacto@nutrias.com.mx',
      password: '123456789',
      telefono: '1234567890',
      carrera: 'Nutriólogo Administrador',
      cumpleaños: new Date('1995-01-01'),
      status: 'TEST_USER',
    },
  });

  console.log('✅ Usuario de prueba creado:', user.email);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error('❌ Error ejecutando seed:', e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
