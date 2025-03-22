import React, { memo } from 'react';

import { GenerateListButton } from '@/components/generate-list-button';
import { ListSongsWrapper } from '@/components/list-songs-wrapper';
import Transition from '@/components/transition';

import { cn } from '@/lib/utils';

import { useStageStore } from '@/store/store';

function ListSongsStageComponent() {
  const { parsedSongs } = useStageStore((state) => state);

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

      <ListSongsWrapper isLoading={!parsedSongs?.length} />

      <GenerateListButton songs={parsedSongs} />
    </>
  );
}

export const ListSongsStage = memo(ListSongsStageComponent);
