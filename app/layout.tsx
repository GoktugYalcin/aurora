import React from 'react';

import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import Link from 'next/link';

import { AppName } from '@/components/app-name';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/toaster';
import Transition from '@/components/transition';
import { WrappedSession } from '@/components/wrapped-session';

import { StageStoreProvider } from '@/store/store';

import './globals.css';

const font = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Aurora',
  description: 'Let your mood be yout DJ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>
        <div className="w-full min-h-screen bg-green-50 antialiased">
          <WrappedSession>
            <StageStoreProvider>
              <Toaster />
              <AppName />
              {children}
              <Footer />
            </StageStoreProvider>
          </WrappedSession>
        </div>
      </body>
    </html>
  );
}
