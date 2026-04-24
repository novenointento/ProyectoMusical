'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth/password';
import { signIn } from '@/auth';

const schema = z.object({
  name: z.string().min(1).max(80).optional().or(z.literal('').transform(() => undefined)),
  email: z.string().email().max(180),
  password: z.string().min(8).max(128),
});

export async function registerAction(formData: FormData) {
  const parsed = schema.safeParse({
    name: formData.get('name') ?? undefined,
    email: formData.get('email'),
    password: formData.get('password'),
  });
  if (!parsed.success) {
    throw new Error('Datos invalidos');
  }

  const { name, email, password } = parsed.data;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error('El email ya esta registrado');
  }

  const passwordHash = await hashPassword(password);
  await prisma.user.create({ data: { email, name, passwordHash } });

  await signIn('credentials', { email, password, redirectTo: '/dashboard' });
  redirect('/dashboard');
}
