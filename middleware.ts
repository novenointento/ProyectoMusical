import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';

// Usa unicamente authConfig (sin Prisma ni bcrypt) para ejecutarse en edge.
export const { auth: middleware } = NextAuth(authConfig);

export default middleware;

export const config = {
  matcher: ['/dashboard/:path*', '/learn/:path*', '/achievements/:path*'],
};
