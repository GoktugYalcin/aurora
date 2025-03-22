import React from 'react';

import { ListSongs } from '@/components/list-songs';
import { ListSongsSkeleton } from '@/components/list-songs-skeleton';
import Transition from '@/components/transition';

import { useStageStore } from '@/store/store';

export const ListSongsWrapper: React.FC<{ isLoading: boolean }> = ({
  isLoading,
}) => {
  const { parsedSongs } = useStageStore((state) => state);
  return isLoading ? <ListSongsSkeleton /> : <ListSongs songs={parsedSongs} />;
};
