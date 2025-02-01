import { NextAuthOptions } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

export const authConfig: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  jwt: {
    maxAge: 60 * 20,
  },
  callbacks: {
    // @ts-ignore
    async jwt({ token, account }) {
      if (account) {
        return {
          ...token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
        };
      } else if (Date.now() < token.expires_at * 1000) {
        return token;
      } else {
        if (!token.refresh_token) throw new TypeError('Missing refresh_token');

        try {
          const response = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            body: new URLSearchParams({
              client_id: process.env.AUTH_GOOGLE_ID!,
              client_secret: process.env.AUTH_GOOGLE_SECRET!,
              grant_type: 'refresh_token',
              refresh_token: token.refresh_token!,
            }),
          });

          const tokensOrError = await response.json();

          if (!response.ok) throw tokensOrError;

          const newTokens = tokensOrError as {
            access_token: string;
            expires_in: number;
            refresh_token?: string;
          };

          return {
            ...token,
            access_token: newTokens.access_token,
            expires_at: Math.floor(Date.now() / 1000 + newTokens.expires_in),
            refresh_token: newTokens.refresh_token
              ? newTokens.refresh_token
              : token.refresh_token,
          };
        } catch (error) {
          console.error('Error refreshing access_token', error);
          token.error = 'RefreshTokenError';
          return token;
        }
      }
    },
    async session({ session, token }) {
      session.error = token.error;
      return session;
    },
    authorized({
      auth,
      request: { nextUrl },
    }: {
      auth: any;
      request: { nextUrl: URL };
    }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
    }),
  ],
};

declare module 'next-auth' {
  interface Session {
    error?: 'RefreshTokenError';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token?: string;
    error?: 'RefreshTokenError';
  }
}
