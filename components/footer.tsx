import React from 'react';

import Link from 'next/link';

import Transition from '@/components/transition';

export function Footer() {
  return (
    <Transition latency={0.8} className="fixed bottom-6 right-6 z-40">
      <footer className="flex justify-center items-center gap-2 opacity-50 hover:opacity-100 transition-opacity px-4 py-2 bg-slate-100 border-slate-200 rounded-full">
        <Link href="https://gokyalc.in" target="_blank">
          A. Göktuğ Yalçın
        </Link>{' '}
        - <span className="font-semibold">{new Date().getFullYear()}</span>
      </footer>
    </Transition>
  );
}
