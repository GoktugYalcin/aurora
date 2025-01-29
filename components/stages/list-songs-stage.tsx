import Transition from '../transition';
import { ListMusic } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import ScrambleHover from '@/components/scramble-hover';

import { ScrambleInHandle } from '../scramble-in';
import { constSongs } from '@/lib/constSongs';
import { useStageStore } from '@/store/store';

export function ListSongsStage() {
  const scrambleRefs = useRef<(ScrambleInHandle | null)[]>([]);
  const songs = useStageStore((state) => state.songs);

  useEffect(() => {
    constSongs.forEach((_, index) => {
      const delay = index * 50;
      setTimeout(() => {
        scrambleRefs.current[index]?.start();
      }, delay);
    });
  }, []);

  return (
    <>
      <Transition
        latency={0.3}
        className={cn('text-4xl font-bold', 'text-blue-700')}
      >
        There it is! We select the songs for your mood:
      </Transition>
      <Transition latency={0.4} className="w-1/2">
        <div className="w-full h-full flex flex-col items-start justify-start gap-y-3">
          {songs.map((text, index) => (
            <motion.div
              layout
              key={index}
              animate={{ opacity: [0, 1, 1], y: [10, 10, 0] }}
              transition={{
                duration: 0.1,
                ease: 'circInOut',
                delay: index * 0.05 + 0.5,
                times: [0, 0.2, 1],
              }}
            >
              <ScrambleHover
                text={`${index + 1} - ${text}`}
                scrambleSpeed={50}
                maxIterations={8}
                useOriginalCharsOnly={true}
                className={cn(
                  'text-2xl leading-none font-[300] cursor-pointer',
                  'text-blue-600',
                )}
              />
            </motion.div>
          ))}
        </div>
      </Transition>
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
