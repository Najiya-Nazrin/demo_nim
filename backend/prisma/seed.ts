import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create Properties
  const properties = [
    { id: 'p1', title: 'Luxury Villa 4BHK', location: 'Beverly Hills', price: 2500000 },
    { id: 'p2', title: 'Modern Downtown Apartment', location: 'City Center', price: 850000 },
    { id: 'p3', title: 'Seaview Penthouse', location: 'Marina Bay', price: 3200000 },
    { id: 'p4', title: 'Suburban Family Home', location: 'Oakwood', price: 650000 }
  ];

  for (const p of properties) {
    await prisma.property.upsert({
      where: { id: p.id },
      update: {},
      create: p,
    });
  }

  // 2. Create Leads
  const leads = [
    { id: 'l1', name: 'John Doe', phone: '+1 555-0101', email: 'john@example.com', source: 'Facebook Ads', score: 85, property_interest: 'p1' },
    { id: 'l2', name: 'Sarah Smith', phone: '+1 555-0102', email: 'sarah@example.com', source: 'Website', score: 92, property_interest: 'p2' },
    { id: 'l3', name: 'Mike Johnson', phone: '+1 555-0103', email: 'mike@example.com', source: 'Instagram', score: 65, property_interest: 'p4' },
    { id: 'l4', name: 'Emily Davis', phone: '+1 555-0104', email: 'emily@example.com', source: 'Referral', score: 99, property_interest: 'p3' },
    { id: 'l5', name: 'David Wilson', phone: '+1 555-0105', email: 'david@example.com', source: 'Google Ads', score: 45, property_interest: 'p2' }
  ];

  for (const l of leads) {
    await prisma.lead.upsert({
      where: { id: l.id },
      update: {},
      create: l,
    });
  }

  // 3. Create Tickets
  const tickets = [
    { id: 't1', customer: 'Alice Cooper', email: 'alice@example.com', subject: 'Billing Issue', description: 'I was charged twice for the service this month. Please refund.' },
    { id: 't2', customer: 'Bob Marley', email: 'bob@example.com', subject: 'Feature Request', description: 'It would be great if we could export the leads to a CSV file directly from the dashboard.' },
    { id: 't3', customer: 'Charlie Chaplin', email: 'charlie@example.com', subject: 'Login Problem', description: 'I keep getting an "invalid credentials" error even after resetting my password.' }
  ];

  for (const t of tickets) {
    await prisma.ticket.upsert({
      where: { id: t.id },
      update: {},
      create: t,
    });
  }

  console.log('Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
