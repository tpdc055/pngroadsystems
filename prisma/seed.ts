import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Seed Provinces
  const provinces = [
    { name: 'Western Province', code: 'WP', region: 'Southern' },
    { name: 'Gulf Province', code: 'GP', region: 'Southern' },
    { name: 'Central Province', code: 'CP', region: 'Southern' },
    { name: 'National Capital District', code: 'NCD', region: 'Southern' },
    { name: 'Oro Province', code: 'OP', region: 'Northern' },
    { name: 'Southern Highlands Province', code: 'SHP', region: 'Highlands' },
    { name: 'Western Highlands Province', code: 'WHP', region: 'Highlands' },
    { name: 'Enga Province', code: 'EP', region: 'Highlands' },
    { name: 'Hela Province', code: 'HP', region: 'Highlands' },
    { name: 'Jiwaka Province', code: 'JP', region: 'Highlands' },
    { name: 'Chimbu Province', code: 'ChP', region: 'Highlands' },
    { name: 'Eastern Highlands Province', code: 'EHP', region: 'Highlands' },
    { name: 'Morobe Province', code: 'MP', region: 'Momase' },
    { name: 'Madang Province', code: 'MaP', region: 'Momase' },
    { name: 'East Sepik Province', code: 'ESP', region: 'Momase' },
    { name: 'Sandaun Province', code: 'SP', region: 'Momase' },
    { name: 'Manus Province', code: 'MnP', region: 'Islands' },
    { name: 'New Ireland Province', code: 'NIP', region: 'Islands' },
    { name: 'East New Britain Province', code: 'ENBP', region: 'Islands' },
    { name: 'West New Britain Province', code: 'WNBP', region: 'Islands' },
    { name: 'Bougainville Province', code: 'BP', region: 'Islands' },
    { name: 'Milne Bay Province', code: 'MBP', region: 'Islands' },
  ];

  for (const province of provinces) {
    await prisma.province.upsert({
      where: { code: province.code },
      update: province,
      create: province,
    });
  }

  console.log('✓ Provinces seeded');

  // Seed Work Types
  const workTypes = [
    { name: 'Road Construction', category: 'Construction' },
    { name: 'Bridge Construction', category: 'Construction' },
    { name: 'Culvert Installation', category: 'Construction' },
    { name: 'Drainage Construction', category: 'Construction' },
    { name: 'Pavement Marking', category: 'Construction' },
    { name: 'Road Maintenance', category: 'Maintenance' },
    { name: 'Pothole Repair', category: 'Maintenance' },
    { name: 'Shoulder Maintenance', category: 'Maintenance' },
    { name: 'Vegetation Clearing', category: 'Maintenance' },
    { name: 'Sign Installation', category: 'Safety' },
    { name: 'Guardrail Installation', category: 'Safety' },
    { name: 'Traffic Control', category: 'Safety' },
    { name: 'Survey and Design', category: 'Planning' },
    { name: 'Environmental Assessment', category: 'Planning' },
    { name: 'Quality Testing', category: 'Quality Control' },
    { name: 'Material Testing', category: 'Quality Control' },
  ];

  for (const workType of workTypes) {
    await prisma.workType.upsert({
      where: { name: workType.name },
      update: workType,
      create: workType,
    });
  }

  console.log('✓ Work types seeded');

  // Create a default admin user
  await prisma.user.upsert({
    where: { email: 'admin@png.gov.pg' },
    update: {},
    create: {
      email: 'admin@png.gov.pg',
      password: '$2b$10$8vVa8aDvEMGzYMkO6U7tBOwGvPvKh3FQgGhCKYg6OmkNEbEfMPYqO', // password: admin123
      name: 'System Administrator',
      role: 'ADMIN',
      isActive: true,
    },
  });

  console.log('✓ Default admin user created (admin@png.gov.pg / admin123)');

  // Create some contractors
  const contractors = [
    { name: 'PNG Construction Ltd', email: 'contact@pngconstruction.pg', phone: '+675 321 1234', specialty: 'Road Construction', rating: 4.5 },
    { name: 'Highlands Infrastructure', email: 'info@highlands.pg', phone: '+675 321 2345', specialty: 'Bridge Construction', rating: 4.2 },
    { name: 'Pacific Roads Company', email: 'office@pacificroads.pg', phone: '+675 321 3456', specialty: 'Highway Construction', rating: 4.8 },
    { name: 'Island Bridge Works', email: 'contact@islandbridge.pg', phone: '+675 321 4567', specialty: 'Bridge and Culvert', rating: 4.3 },
  ];

  for (const contractor of contractors) {
    await prisma.contractor.upsert({
      where: { name: contractor.name },
      update: contractor,
      create: contractor,
    });
  }

  console.log('✓ Contractors seeded');

  console.log('🎉 Database seeded successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
