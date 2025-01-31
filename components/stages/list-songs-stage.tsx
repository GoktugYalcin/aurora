'use client';

import React, { useEffect, useState } from 'react';

import { SpotifyTrack } from '@/types/spotify';

import { GenerateListButton } from '@/components/generate-list-button';
import { ListSongs } from '@/components/list-songs';
import { ListSongsSkeleton } from '@/components/list-songs-skeleton';
import Transition from '@/components/transition';

import { toast } from '@/hooks/use-toast';

import { cn } from '@/lib/utils';

import { useStageStore } from '@/store/store';

export function ListSongsStage({ songs }: { songs: string[] }) {
  const { parsedSongs, setParsedSongs } = useStageStore((state) => state);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/find-songs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ songs: songs }),
        });

        if (!res.ok) throw new Error(res.statusText);

        const data: { songs: SpotifyTrack[] } = await res.json();
        setParsedSongs(data.songs);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Please, try again later.';
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: `There was a problem with your request: ${message ?? 'Please, try again later.'}`,
        });
      } finally {
        setLoading(false);
      }
    };

    if (songs.length > 0) {
      fetchSongs();
    }
  }, []);

  return (
    <>
      <Transition
        latency={0.3}
        className={cn(
          'lg:text-4xl text-xl lg:px-0 px-8 lg:pt-0 pt-10 font-bold',
          'text-blue-700',
        )}
      >
        There it is! We select the songs for your mood:
      </Transition>

      {loading || !parsedSongs?.length ? (
        <ListSongsSkeleton />
      ) : (
        <ListSongs songs={parsedSongs} />
      )}

      {parsedSongs.length > 0 && <GenerateListButton songs={parsedSongs} />}
    </>
  );
}
