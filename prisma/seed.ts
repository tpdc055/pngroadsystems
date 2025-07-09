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

  const provinceRecords = [];
  for (const province of provinces) {
    const record = await prisma.province.upsert({
      where: { code: province.code },
      update: province,
      create: province,
    });
    provinceRecords.push(record);
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

  // Create users with different roles
  const users = [
    {
      email: 'admin@png.gov.pg',
      password: '$2b$10$8vVa8aDvEMGzYMkO6U7tBOwGvPvKh3FQgGhCKYg6OmkNEbEfMPYqO', // password: admin123
      name: 'System Administrator',
      role: 'ADMIN',
      isActive: true,
    },
    {
      email: 'michael.kila@works.png.gov.pg',
      password: '$2b$10$8vVa8aDvEMGzYMkO6U7tBOwGvPvKh3FQgGhCKYg6OmkNEbEfMPYqO',
      name: 'Michael Kila',
      role: 'PROJECT_MANAGER',
      isActive: true,
    },
    {
      email: 'james.peter@works.png.gov.pg',
      password: '$2b$10$8vVa8aDvEMGzYMkO6U7tBOwGvPvKh3FQgGhCKYg6OmkNEbEfMPYqO',
      name: 'James Peter',
      role: 'SITE_ENGINEER',
      isActive: true,
    },
    {
      email: 'mary.thomas@works.png.gov.pg',
      password: '$2b$10$8vVa8aDvEMGzYMkO6U7tBOwGvPvKh3FQgGhCKYg6OmkNEbEfMPYqO',
      name: 'Mary Thomas',
      role: 'FINANCIAL_OFFICER',
      isActive: true,
    },
    {
      email: 'david.namaliu@works.png.gov.pg',
      password: '$2b$10$8vVa8aDvEMGzYMkO6U7tBOwGvPvKh3FQgGhCKYg6OmkNEbEfMPYqO',
      name: 'David Namaliu',
      role: 'PROJECT_MANAGER',
      isActive: true,
    },
  ];

  const userRecords = [];
  for (const user of users) {
    const record = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
    userRecords.push(record);
  }

  console.log('✓ Users created');

  // Create contractors
  const contractors = [
    { name: 'PNG Construction Ltd', email: 'contact@pngconstruction.pg', phone: '+675 321 1234', specialty: 'Road Construction', rating: 4.5, license: 'PNG-CONST-001' },
    { name: 'Highlands Infrastructure', email: 'info@highlands.pg', phone: '+675 321 2345', specialty: 'Bridge Construction', rating: 4.2, license: 'PNG-CONST-002' },
    { name: 'Pacific Roads Company', email: 'office@pacificroads.pg', phone: '+675 321 3456', specialty: 'Highway Construction', rating: 4.8, license: 'PNG-CONST-003' },
    { name: 'Island Bridge Works', email: 'contact@islandbridge.pg', phone: '+675 321 4567', specialty: 'Bridge and Culvert', rating: 4.3, license: 'PNG-CONST-004' },
    { name: 'Mount Hagen Builders', email: 'info@mthagen.pg', phone: '+675 321 5678', specialty: 'Mountain Road Construction', rating: 4.1, license: 'PNG-CONST-005' },
    { name: 'Port Moresby Engineering', email: 'projects@pmeng.pg', phone: '+675 321 6789', specialty: 'Urban Infrastructure', rating: 4.6, license: 'PNG-CONST-006' },
  ];

  const contractorRecords = [];
  for (const contractor of contractors) {
    const record = await prisma.contractor.upsert({
      where: { name: contractor.name },
      update: contractor,
      create: contractor,
    });
    contractorRecords.push(record);
  }

  console.log('✓ Contractors seeded');

  // Create sample projects
  const sampleProjects = [
    {
      name: 'Highlands Highway Rehabilitation Project',
      description: 'Major rehabilitation of the Highlands Highway connecting Mount Hagen to Port Moresby, including bridge upgrades and safety improvements',
      location: 'Mount Hagen to Lae Highway (450km)',
      provinceId: provinceRecords.find(p => p.code === 'WHP')?.id || provinceRecords[0].id,
      status: 'ACTIVE',
      progress: 65,
      budget: 125000000,
      spent: 81250000,
      startDate: new Date('2023-03-15'),
      endDate: new Date('2025-12-31'),
      contractor: 'Mount Hagen Builders',
      managerId: userRecords.find(u => u.name === 'Michael Kila')?.id,
      fundingSource: 'WORLD_BANK',
    },
    {
      name: 'Port Moresby Ring Road Development',
      description: 'Construction of new ring road around Port Moresby to reduce traffic congestion and improve urban mobility',
      location: 'Port Moresby Metropolitan Area',
      provinceId: provinceRecords.find(p => p.code === 'NCD')?.id || provinceRecords[0].id,
      status: 'ACTIVE',
      progress: 45,
      budget: 89000000,
      spent: 40050000,
      startDate: new Date('2024-01-10'),
      endDate: new Date('2026-06-30'),
      contractor: 'Port Moresby Engineering',
      managerId: userRecords.find(u => u.name === 'David Namaliu')?.id,
      fundingSource: 'ADB',
    },
    {
      name: 'Kokoda Track Access Road',
      description: 'Improvement of access roads to Kokoda Track for tourism and historical preservation',
      location: 'Kokoda Track Access Points',
      provinceId: provinceRecords.find(p => p.code === 'OP')?.id || provinceRecords[0].id,
      status: 'PLANNING',
      progress: 15,
      budget: 25000000,
      spent: 3750000,
      startDate: new Date('2024-09-01'),
      endDate: new Date('2025-08-31'),
      contractor: 'Pacific Roads Company',
      managerId: userRecords.find(u => u.name === 'Michael Kila')?.id,
      fundingSource: 'AUSTRALIA',
    },
    {
      name: 'Sepik River Bridge Construction',
      description: 'Construction of new bridge over Sepik River to connect remote communities',
      location: 'Sepik River Crossing, Wewak District',
      provinceId: provinceRecords.find(p => p.code === 'ESP')?.id || provinceRecords[0].id,
      status: 'ACTIVE',
      progress: 30,
      budget: 45000000,
      spent: 13500000,
      startDate: new Date('2024-02-15'),
      endDate: new Date('2025-11-30'),
      contractor: 'Island Bridge Works',
      managerId: userRecords.find(u => u.name === 'David Namaliu')?.id,
      fundingSource: 'JAPAN',
    },
    {
      name: 'Bougainville Coastal Road Rehabilitation',
      description: 'Rehabilitation of coastal roads in Bougainville for post-conflict reconstruction',
      location: 'Bougainville Coastal Areas',
      provinceId: provinceRecords.find(p => p.code === 'BP')?.id || provinceRecords[0].id,
      status: 'ON_HOLD',
      progress: 8,
      budget: 35000000,
      spent: 2800000,
      startDate: new Date('2024-06-01'),
      endDate: new Date('2026-03-31'),
      contractor: 'PNG Construction Ltd',
      managerId: userRecords.find(u => u.name === 'Michael Kila')?.id,
      fundingSource: 'EU',
    },
    {
      name: 'Mining Access Road - Ok Tedi',
      description: 'Construction of heavy-duty access road to Ok Tedi mining operations',
      location: 'Star Mountains, Western Province',
      provinceId: provinceRecords.find(p => p.code === 'WP')?.id || provinceRecords[0].id,
      status: 'COMPLETED',
      progress: 100,
      budget: 67000000,
      spent: 64300000,
      startDate: new Date('2022-05-01'),
      endDate: new Date('2024-01-15'),
      contractor: 'Highlands Infrastructure',
      managerId: userRecords.find(u => u.name === 'David Namaliu')?.id,
      fundingSource: 'JOINT',
    },
  ];

  const projectRecords = [];
  for (const project of sampleProjects) {
    const record = await prisma.project.create({
      data: project,
    });
    projectRecords.push(record);
  }

  console.log('✓ Sample projects created');

  // Create GPS entries for projects
  const gpsEntries = [];
  const locations = [
    { lat: -6.314993, lng: 143.95555, desc: 'Mount Hagen City Center' },
    { lat: -6.460734, lng: 143.826765, desc: 'Highlands Highway KM 25' },
    { lat: -6.689438, lng: 143.69128, desc: 'Bridge Construction Site' },
    { lat: -9.4438, lng: 147.1803, desc: 'Port Moresby CBD' },
    { lat: -9.3956, lng: 147.1411, desc: 'Ring Road Junction' },
    { lat: -8.8833, lng: 147.7333, desc: 'Kokoda Track Access' },
    { lat: -3.5896, lng: 143.6297, desc: 'Sepik River Bridge Site' },
    { lat: -6.2123, lng: 155.2628, desc: 'Bougainville Coastal Road' },
    { lat: -5.1989, lng: 141.3994, desc: 'Ok Tedi Mining Access' },
  ];

  let entryIndex = 0;
  for (const project of projectRecords) {
    for (let i = 0; i < 3; i++) {
      const location = locations[entryIndex % locations.length];
      gpsEntries.push({
        latitude: location.lat + (Math.random() - 0.5) * 0.01,
        longitude: location.lng + (Math.random() - 0.5) * 0.01,
        description: `${location.desc} - ${project.name}`,
        projectId: project.id,
        userId: userRecords[Math.floor(Math.random() * userRecords.length)].id,
        taskName: 'Site Survey',
        workType: 'Survey and Design',
        roadSide: Math.random() > 0.5 ? 'Left' : 'Right',
        startChainage: `${Math.floor(Math.random() * 100)}+${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        endChainage: `${Math.floor(Math.random() * 100) + 1}+${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        taskDescription: 'Regular site inspection and progress monitoring',
        timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      });
      entryIndex++;
    }
  }

  await prisma.gpsEntry.createMany({
    data: gpsEntries,
  });

  console.log('✓ GPS entries created');

  // Create financial entries
  const financialEntries = [];
  const expenseCategories = ['MATERIALS', 'LABOR', 'EQUIPMENT', 'TRANSPORT', 'UTILITIES'];

  for (const project of projectRecords) {
    for (let i = 0; i < 5; i++) {
      financialEntries.push({
        projectId: project.id,
        userId: userRecords.find(u => u.role === 'FINANCIAL_OFFICER')?.id || userRecords[0].id,
        category: expenseCategories[i % expenseCategories.length] as any,
        type: 'EXPENSE',
        amount: Math.floor(Math.random() * 500000) + 50000,
        description: `${expenseCategories[i % expenseCategories.length].toLowerCase()} costs for ${project.name}`,
        date: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000),
        invoiceNumber: `INV-${Date.now()}-${i}`,
        vendor: contractorRecords[Math.floor(Math.random() * contractorRecords.length)].name,
        isApproved: true,
        currency: 'PGK',
      });
    }
  }

  await prisma.financialEntry.createMany({
    data: financialEntries,
  });

  console.log('✓ Financial entries created');

  // Create progress entries
  const progressEntries = [];

  for (const project of projectRecords) {
    for (let i = 0; i < 4; i++) {
      const baseProgress = Math.max(0, project.progress - (4 - i) * 15);
      progressEntries.push({
        projectId: project.id,
        date: new Date(Date.now() - (4 - i) * 15 * 24 * 60 * 60 * 1000),
        physicalProgress: Math.max(0, baseProgress + Math.random() * 5),
        financialProgress: Math.max(0, baseProgress + Math.random() * 8),
        plannedProgress: baseProgress + 10,
        milestones: JSON.stringify([
          'Site preparation completed',
          'Foundation work in progress',
          'Structural work initiated',
        ]),
        issues: Math.random() > 0.7 ? 'Weather delays due to heavy rainfall' : null,
        nextActions: 'Continue with scheduled construction activities',
        weatherConditions: ['Sunny', 'Cloudy', 'Rainy', 'Overcast'][Math.floor(Math.random() * 4)],
        workforceCount: Math.floor(Math.random() * 50) + 20,
        equipmentStatus: 'All equipment operational',
        notes: `Progress update for week ${i + 1}`,
      });
    }
  }

  await prisma.progressEntry.createMany({
    data: progressEntries,
  });

  console.log('✓ Progress entries created');

  // Create system settings
  const systemSettings = [
    { key: 'system_name', value: 'PNG Road Construction Monitor', type: 'string', category: 'General', description: 'Application name' },
    { key: 'organization_name', value: 'Papua New Guinea Department of Works', type: 'string', category: 'General', description: 'Organization name' },
    { key: 'default_currency', value: 'PGK', type: 'string', category: 'Financial', description: 'Default currency for financial transactions' },
    { key: 'enable_gps_tracking', value: 'true', type: 'boolean', category: 'Features', description: 'Enable GPS tracking functionality' },
    { key: 'max_file_upload_size', value: '10485760', type: 'number', category: 'System', description: 'Maximum file upload size in bytes' },
    { key: 'notification_email', value: 'admin@works.png.gov.pg', type: 'string', category: 'System', description: 'System notification email' },
  ];

  for (const setting of systemSettings) {
    await prisma.systemSetting.upsert({
      where: { key: setting.key },
      update: setting,
      create: setting,
    });
  }

  console.log('✓ System settings configured');

  console.log('🎉 Database seeded successfully with comprehensive sample data!');
  console.log('\n📊 Summary:');
  console.log(`• ${provinces.length} PNG Provinces`);
  console.log(`• ${workTypes.length} Work Types`);
  console.log(`• ${users.length} Users (various roles)`);
  console.log(`• ${contractors.length} Contractors`);
  console.log(`• ${sampleProjects.length} Sample Projects`);
  console.log(`• ${gpsEntries.length} GPS Tracking Entries`);
  console.log(`• ${financialEntries.length} Financial Transactions`);
  console.log(`• ${progressEntries.length} Progress Reports`);
  console.log(`• ${systemSettings.length} System Settings`);
  console.log('\n🔑 Test Credentials:');
  console.log('• Admin: admin@png.gov.pg / admin123');
  console.log('• Project Manager: michael.kila@works.png.gov.pg / admin123');
  console.log('• Site Engineer: james.peter@works.png.gov.pg / admin123');
  console.log('• Financial Officer: mary.thomas@works.png.gov.pg / admin123');
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
