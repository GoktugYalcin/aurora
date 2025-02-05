'use client';

import { useEffect, useState } from 'react';

import { AnimatePresence } from 'motion/react';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import { ListSongsStage } from '@/components/stages/list-songs-stage';
import { MoodSelectStage } from '@/components/stages/mood-select-stage';
import { PlaylistStage } from '@/components/stages/playlist-stage';

import { useStageStore } from '@/store/store';

const AnimatedGradient = dynamic(
  () => import('../../components/animated-gradient-with-svg'),
  { ssr: false },
);

export default function SuggestPage() {
  const { stage, songs } = useStageStore((state) => state);
  const [colorArr, setColor] = useState<string[]>(stage.colors);
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  useEffect(() => {
    setTimeout(() => {
      setColor(stage.colors);
    }, 300);
  }, [stage]);

  return (
    <main className="flex flex-col justify-center items-center w-full min-h-screen lg:gap-20 gap-2">
      <AnimatedGradient colors={colorArr} speed={0.12} blur="heavy" />
      <AnimatePresence mode="wait">
        {stage.type === 'selection' && <MoodSelectStage key="selection" />}
        {stage.type === 'listing' && (
          <ListSongsStage songs={songs} key="listing" />
        )}
        {stage.type === 'playlist' && <PlaylistStage key="playlist" />}
      </AnimatePresence>
    </main>
  );
}
