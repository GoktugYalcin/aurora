import axios from 'axios';
import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import SpotifyProvider from 'next-auth/providers/spotify';

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const basicAuth = Buffer.from(
      `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
    ).toString('base64');
    const { data } = await axios.post(
      'https://accounts.spotify.com/api/token',
      {
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      },
      {
        headers: {
          Authorization: `Basic ${basicAuth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    return {
      ...token,
      accessToken: data.access_token,
      accessTokenExpires: Date.now() + data.expires_in * 1000,
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshTokenError',
    };
  }
}

export const authConfig: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  jwt: {
    maxAge: 60 * 20,
  },
  callbacks: {
    // @ts-ignore
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: (account.expires_at ?? 1) * 1000,
          user,
        };
      }
      if (
        token.accessTokenExpires &&
        Date.now() < (token.accessTokenExpires as number)
      ) {
        return token;
      }
      const newToken = await refreshAccessToken(token);
      return newToken;
    },
    async session({ session, token }) {
      // @ts-ignore
      session.accessToken = token.accessToken ?? '';
      // @ts-ignore
      session.user = token.user;
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
