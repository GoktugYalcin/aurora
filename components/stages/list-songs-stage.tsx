'use client';

import React, { useEffect, useState } from 'react';

import { SpotifyTrack } from '@/types/spotify';

import { GenerateListButton } from '@/components/generate-list-button';
import { ListSongs } from '@/components/list-songs';
import { ListSongsSkeleton } from '@/components/list-songs-skeleton';
import Transition from '@/components/transition';

import { toast } from '@/hooks/use-toast';

import { cn } from '@/lib/utils';

export function ListSongsStage({ songs }: { songs: string[] }) {
  const [songMetadata, setSongMetadata] = useState<SpotifyTrack[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);

      try {
        const res = await fetch('/api/find-songs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ songs }),
        });

        if (!res.ok) throw new Error(res.statusText);

        const data: { songs: SpotifyTrack[] } = await res.json();
        setSongMetadata(data.songs);
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
  }, [songs]);

  return (
    <>
      <Transition
        latency={0.3}
        className={cn('text-4xl font-bold', 'text-blue-700')}
      >
        There it is! We select the songs for your mood:
      </Transition>

      {loading || !songMetadata?.length ? (
        <ListSongsSkeleton />
      ) : (
        <ListSongs songs={songMetadata} />
      )}

      {songMetadata.length > 0 && <GenerateListButton songs={songMetadata} />}
    </>
  );
}
