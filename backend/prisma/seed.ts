import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.upsert({
    where: { slug: 'template-project' },
    update: {
      description: 'Generic starter project generated from the template.',
    },
    create: {
      name: 'Template Project',
      slug: 'template-project',
      description: 'Generic starter project generated from the template.',
    },
  });

  await prisma.task.upsert({
    where: { id: 1 },
    update: {
      title: 'Define the first real feature',
      status: 'todo',
    },
    create: {
      projectId: project.id,
      title: 'Define the first real feature',
      description: 'Replace this seeded task with your project-specific roadmap.',
      status: 'todo',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
