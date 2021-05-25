import { prisma } from '../lib/prisma'

const disciplines = [
  'Customer Success',
  'Data',
  'Design',
  'IT Security',
  'Marketing',
  'Operations',
  'Product',
  'Project Management',
  'Quality Assurance',
  'Sales',
  'Software Engineering',
]

const areas = [
  'Account Management',
  'Customer Service',
  'Customer Success',
  'Data Science / Analytics',
  'Digital Marketing',
  'Digital Product Management',
  'Operations Management',
  'Product Design',
  'Product Marketing',
  'Project Management',
  'Quality Assurance',
  'Sales Operations',
  'Security',
  'Technical Documentation',
  'Web Development',
]

async function main() {
  for (const discipline of disciplines) {
    await prisma.discipline.upsert({
      where: { name: discipline },
      update: {},
      create: {
        name: discipline,
      },
    })
  }

  for (const area of areas) {
    await prisma.area.upsert({
      where: { name: area },
      update: {},
      create: {
        name: area,
      },
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
