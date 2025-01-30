'use client';

import React, { useEffect, useState } from 'react';

import { SpotifyTrack } from '@/types';
import { ListMusic } from 'lucide-react';

import { ListSongs } from '@/components/list-songs';
import Transition from '@/components/transition';

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

        if (!res.ok) throw new Error('Failed to fetch songs');

        const data: { songs: SpotifyTrack[] } = await res.json();
        setSongMetadata(data.songs);
      } catch (error) {
        console.error('Error fetching songs:', error);
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

      {loading ? (
        <Transition latency={0.4} className="w-1/2 animate-pulse">
          <div className="h-5 bg-gray-400 rounded dark:bg-gray-700 mb-4 max-w-[600px]"></div>
          <div className="h-5 bg-gray-400 rounded dark:bg-gray-700 mb-4 max-w-[650px]"></div>
          <div className="h-5 bg-gray-400 rounded dark:bg-gray-700 mb-4 max-w-[610px]"></div>
          <div className="h-5 bg-gray-400 rounded dark:bg-gray-700 mb-4 max-w-[680px]"></div>
          <div className="h-5 bg-gray-400 rounded dark:bg-gray-700 mb-4 max-w-[630px]"></div>
          <div className="h-5 bg-gray-400 rounded dark:bg-gray-700 mb-4 max-w-[640px]"></div>
          <div className="h-5 bg-gray-400 rounded dark:bg-gray-700 mb-4 max-w-[660px]"></div>
          <div className="h-5 bg-gray-400 rounded dark:bg-gray-700 mb-4 max-w-[600px]"></div>
          <div className="h-5 bg-gray-400 rounded dark:bg-gray-700 mb-4 max-w-[690px]"></div>
          <div className="h-5 bg-gray-400 rounded dark:bg-gray-700 mb-4 max-w-[670px]"></div>
          <div className="h-5 bg-gray-400 rounded dark:bg-gray-700 mb-4 max-w-[620px]"></div>
          <div className="h-5 bg-gray-400 rounded dark:bg-gray-700 mb-4 max-w-[700px]"></div>
        </Transition>
      ) : (
        <ListSongs songs={songMetadata} />
      )}

      <Transition
        latency={0.4}
        className="w-screen flex justify-center items-center gap-6"
      >
        <div
          className={cn(
            'group flex justify-center items-center gap-2 px-6 py-2 cursor-pointer rounded-full select-none active:font-semibold active:translate-y-0.5 active:transition-all',
            'bg-blue-200 text-blue-500 active:bg-blue-300/90',
          )}
        >
          <span className="text-xl">Generate List</span>
          <ListMusic className="w-4 h-4 group-hover:animate-bounce transition-all" />
        </div>
      </Transition>
    </>
  );
}
