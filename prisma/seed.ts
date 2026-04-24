import { PrismaClient, ExerciseType, Level, Difficulty } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const course = await prisma.course.upsert({
    where: { slug: 'fundamentos' },
    update: {},
    create: {
      slug: 'fundamentos',
      title: 'Fundamentos del lenguaje musical',
      description:
        'Primeros pasos del conservatorio elemental: pentagrama, claves y notas naturales.',
      order: 0,
      level: Level.ELEMENTARY,
      published: true,
    },
  });

  const topic = await prisma.topic.upsert({
    where: { courseId_slug: { courseId: course.id, slug: 'lectura-clave-sol' } },
    update: {},
    create: {
      courseId: course.id,
      slug: 'lectura-clave-sol',
      title: 'Lectura en clave de sol',
      description: 'Identificacion de notas naturales en la clave de sol.',
      order: 0,
    },
  });

  const lesson = await prisma.lesson.upsert({
    where: { topicId_slug: { topicId: topic.id, slug: 'reconocer-notas-do-sol' } },
    update: {},
    create: {
      topicId: topic.id,
      slug: 'reconocer-notas-do-sol',
      title: 'Reconocer notas Do a Sol (4a octava)',
      description:
        'Identifica la nota representada en el pentagrama entre las opciones mostradas.',
      order: 0,
      difficulty: Difficulty.BEGINNER,
      estimatedMinutes: 10,
    },
  });

  // 5 ejercicios NoteRecognition con rangos progresivos.
  const exerciseSeeds = [
    { from: 'C4', to: 'E4' },
    { from: 'C4', to: 'F4' },
    { from: 'C4', to: 'G4' },
    { from: 'D4', to: 'G4' },
    { from: 'C4', to: 'G4' },
  ];

  await prisma.exercise.deleteMany({ where: { lessonId: lesson.id } });
  for (const [idx, range] of exerciseSeeds.entries()) {
    await prisma.exercise.create({
      data: {
        lessonId: lesson.id,
        type: ExerciseType.MULTIPLE_CHOICE,
        order: idx,
        points: 10,
        config: {
          kind: 'NOTE_RECOGNITION',
          clef: 'treble',
          noteRange: range,
          optionCount: 4,
        },
      },
    });
  }

  // Logros iniciales.
  await prisma.achievement.upsert({
    where: { slug: 'primera-leccion' },
    update: {},
    create: {
      slug: 'primera-leccion',
      title: 'Primera leccion',
      description: 'Has completado tu primera leccion.',
      icon: 'GraduationCap',
      points: 10,
      criteria: { type: 'LESSONS_COMPLETED', count: 1 },
    },
  });

  await prisma.achievement.upsert({
    where: { slug: 'cinco-aciertos' },
    update: {},
    create: {
      slug: 'cinco-aciertos',
      title: '5 aciertos seguidos',
      description: 'Cinco ejercicios correctos sin fallar.',
      icon: 'Sparkles',
      points: 15,
      criteria: { type: 'CORRECT_STREAK', count: 5 },
    },
  });

  await prisma.achievement.upsert({
    where: { slug: 'primer-pleno' },
    update: {},
    create: {
      slug: 'primer-pleno',
      title: 'Primer 100%',
      description: 'Completa una leccion sin fallar ningun ejercicio.',
      icon: 'Trophy',
      points: 25,
      criteria: { type: 'LESSON_PERFECT', count: 1 },
    },
  });

  console.log('Seed completado:', { course: course.slug, topic: topic.slug, lesson: lesson.slug });
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
