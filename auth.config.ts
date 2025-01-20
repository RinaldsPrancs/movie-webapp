import type { NextAuthConfig } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/view');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; 
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/view', nextUrl));
      }
      return true;
    },
  },
  providers: [], 
} satisfies NextAuthConfig;