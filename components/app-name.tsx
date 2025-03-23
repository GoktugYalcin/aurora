'use client';

import { Outfit } from 'next/font/google';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import { useStageStore } from '@/store/store';

const outfit = Outfit({
  weight: ['600', '700', '800'],
  preload: false,
  subsets: ['latin'],
});

export function AppName() {
  const { stage } = useStageStore((stage) => stage);
  return (
    <Link
      href={'/'}
      className={cn(
        'font-[800] fixed top-6 left-6 text-3xl z-50 text-slate-700/90',
        outfit.className,
        {
          'text-slate-300/90': stage.type === 'playlist',
          'text-slate-700/90': stage.type !== 'playlist',
        },
      )}
    >
      Aurora
    </Link>
  );
}
