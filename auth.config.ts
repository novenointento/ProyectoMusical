import type { NextAuthConfig } from 'next-auth';

// Configuracion edge-safe (sin Prisma ni bcrypt).
// Se importa desde middleware.ts para respetar el runtime edge.
export const authConfig = {
  pages: {
    signIn: '/sign-in',
  },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = request.nextUrl;

      const protectedPrefixes = ['/dashboard', '/learn', '/achievements'];
      const isProtected = protectedPrefixes.some((p) => pathname.startsWith(p));

      if (isProtected && !isLoggedIn) return false;
      return true;
    },
    session({ session, token }) {
      if (token?.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
