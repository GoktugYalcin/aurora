import React, { useEffect, useRef } from 'react';

import { SpotifyTrack } from '@/types/spotify';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

import ScrambleHover from '@/components/scramble-hover';
import ScrambleIn, { ScrambleInHandle } from '@/components/scramble-in';
import Transition from '@/components/transition';
import VariableFontHoverByLetter from '@/components/variable-font-hover-by-letter';

import { constSongs } from '@/lib/constSongs';
import { cn } from '@/lib/utils';

export const ListSongs: React.FC<{ songs: SpotifyTrack[] }> = ({ songs }) => {
  const scrambleRefs = useRef<(ScrambleInHandle | null)[]>([]);

  useEffect(() => {
    constSongs.forEach((_, index) => {
      const delay = index * 50;
      setTimeout(() => {
        scrambleRefs.current[index]?.start();
      }, delay);
    });
  }, []);

  return (
    <Transition latency={0.4} className="w-1/2">
      <div className="w-full h-full flex flex-col items-start justify-start gap-y-3">
        {songs.map((song, index) => (
          <Link href={song.spotifyUrl} key={index} target={'_blank'}>
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
              className={'flex justify-center items-center gap-4 group'}
            >
              <VariableFontHoverByLetter
                label={`${index + 1} - ${song.artist} - ${song.name}`}
                staggerDuration={0.0}
                transition={{ duration: 1, type: 'spring' }}
                fromFontVariationSettings="'wght' 400, 'slnt' -10"
                toFontVariationSettings="'wght' 900, 'slnt' -10"
                className={cn(
                  'text-2xl leading-none font-[400] cursor-pointer text-ellipsis overflow-hidden',
                  'text-blue-700 h-[30px]',
                )}
              />
              <Image
                src={song.cover}
                alt={song.name}
                width={30}
                height={30}
                className={'border-2 border-white hidden group-hover:block'}
              />
            </motion.div>
          </Link>
        ))}
      </div>
    </Transition>
  );
};
