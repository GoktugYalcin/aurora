'use client';

import React, { useState } from 'react';

import { SpotifyTrack } from '@/types/spotify';
import { ListMusic, LoaderCircle } from 'lucide-react';

import Transition from '@/components/transition';

import { toast } from '@/hooks/use-toast';

import { cn } from '@/lib/utils';

import { useStageStore } from '@/store/store';

export const GenerateListButton: React.FC<{ songs: SpotifyTrack[] }> = ({
  songs,
}) => {
  const [loading, setLoading] = useState(false);
  const { playlistName } = useStageStore((state) => state);

  const handleCreateList = () => {
    setLoading(true);
    console.log(songs);
    try {
      fetch('/api/create-playlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          songIds: songs.map((song) => song.id),
          playlistName: playlistName,
        }),
      })
        .then((res) => res.json())
        .then((res) => console.log(res))
        .finally(() => setLoading(false));
    } catch (err) {
      setLoading(false);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: `An error occured when creating a playlist. Please try again later.`,
      });
    }
  };

  return (
    <Transition
      latency={0.4}
      className="w-screen flex justify-center items-center gap-6"
    >
      <div
        onClick={() => handleCreateList()}
        className={cn(
          'group flex justify-center items-center gap-2 px-6 py-2 cursor-pointer rounded-full select-none active:font-semibold active:translate-y-0.5 active:transition-all',
          'bg-blue-200 text-blue-500 active:bg-blue-300/90',
          loading && 'pointer-events-none opacity-60',
        )}
      >
        <span className="text-xl">
          {loading ? 'Generating List' : 'Generate List'}
        </span>
        {loading ? (
          <LoaderCircle className="w-4 h-4 animate-spin" />
        ) : (
          <ListMusic className="w-4 h-4 group-hover:animate-bounce transition-all" />
        )}
      </div>
    </Transition>
  );
};
