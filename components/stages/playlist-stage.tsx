import React, { useEffect, useRef } from 'react';

import { motion, stagger, useAnimate } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

import Floating, { FloatingElement } from '@/components/parallax-floating';

import { useStageStore } from '@/store/store';

import Transition from '../transition';

export function PlaylistStage() {
  const { parsedSongs, playlistProps } = useStageStore((state) => state);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      'img',
      { opacity: [0, 1] },
      { duration: 0.5, delay: stagger(0.15) },
    );
  }, []);

  return (
    <>
      <Transition latency={0.1} className="fixed left-0 top-0 w-full h-[100vh]">
        <Transition
          className="flex flex-col w-full h-full justify-center items-center bg-black overflow-hidden"
          ref={scope}
        >
          {playlistProps && (
            <>
              <motion.div
                className="z-50 text-center space-y-4 items-center flex flex-col text-white font-bold text-2xl mb-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.88, delay: 1.5 }}
              >
                There you are, your playlist is ready to listen!
              </motion.div>
              <motion.div
                className="z-50 text-center space-y-4 items-center flex flex-col lg:bg-gray-600/40 text-wrap w-1/4 bg-gray-600 lg:px-10 lg:py-10 p-5 rounded-2xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.88, delay: 1.5 }}
              >
                <motion.img
                  initial={{ opacity: 0 }}
                  src={playlistProps?.playlistImage}
                  className="lg:w-30 lg:h-30 w-28 h-28 object-cover duration-200 rounded-lg"
                />
                <p className="text-2xl md:text-4xl z-50 text-white font-[Outfit] select-none pb-4">
                  {playlistProps?.playlistName}
                </p>
                <Link
                  href={playlistProps?.playlistUrl}
                  target={'_blank'}
                  className="flex justify-center items-center gap-2 text-sm z-50 hover:scale-110 transition-transform text-black rounded-full bg-[#1DB954] py-2 px-3 cursor-pointer"
                >
                  <Image
                    src={'/spotify.svg'}
                    alt="spotify"
                    width={20}
                    height={20}
                  />
                  <span>Go to list</span>
                </Link>
              </motion.div>
            </>
          )}

          <Floating
            easingFactor={1.35}
            sensitivity={-1}
            className="overflow-hidden"
          >
            <FloatingElement depth={0.5} className="top-[8%] left-[11%]">
              <Link href={parsedSongs[0].spotifyUrl} target={'_blank'}>
                <motion.img
                  initial={{ opacity: 0 }}
                  src={parsedSongs[0].cover}
                  className="w-16 h-16 md:w-24 md:h-24 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
                />
              </Link>
            </FloatingElement>
            <FloatingElement depth={1} className="top-[10%] left-[32%]">
              <Link href={parsedSongs[1].spotifyUrl} target={'_blank'}>
                <motion.img
                  initial={{ opacity: 0 }}
                  src={parsedSongs[1].cover}
                  className="w-20 h-20 md:w-28 md:h-28 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-sm"
                />
              </Link>
            </FloatingElement>
            <FloatingElement depth={2} className="top-[2%] left-[53%]">
              <Link href={parsedSongs[2].spotifyUrl} target={'_blank'}>
                <motion.img
                  initial={{ opacity: 0 }}
                  src={parsedSongs[2].cover}
                  className="w-28 h-40 md:w-40 md:h-52 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-sm"
                />
              </Link>
            </FloatingElement>
            <FloatingElement depth={1} className="top-[20%] left-[83%]">
              <Link href={parsedSongs[3].spotifyUrl} target={'_blank'}>
                <motion.img
                  initial={{ opacity: 0 }}
                  src={parsedSongs[3].cover}
                  className="w-24 h-24 md:w-32 md:h-32 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-sm"
                />
              </Link>
            </FloatingElement>

            <FloatingElement depth={1} className="top-[40%] left-[2%]">
              <Link href={parsedSongs[4].spotifyUrl} target={'_blank'}>
                <motion.img
                  initial={{ opacity: 0 }}
                  src={parsedSongs[4].cover}
                  className="w-28 h-28 md:w-36 md:h-36 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-sm"
                />
              </Link>
            </FloatingElement>
            <FloatingElement depth={2} className="top-[60%] left-[80%]">
              <Link href={parsedSongs[7].spotifyUrl} target={'_blank'}>
                <motion.img
                  initial={{ opacity: 0 }}
                  src={parsedSongs[7].cover}
                  className="w-28 h-28 md:w-36 md:h-48 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-sm"
                />
              </Link>
            </FloatingElement>

            <FloatingElement depth={4} className="top-[73%] left-[15%]">
              <Link href={parsedSongs[5].spotifyUrl} target={'_blank'}>
                <motion.img
                  initial={{ opacity: 0 }}
                  src={parsedSongs[5].cover}
                  className="w-40 md:w-52 h-full object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-sm"
                />
              </Link>
            </FloatingElement>
            <FloatingElement depth={1} className="top-[80%] left-[50%]">
              <Link href={parsedSongs[6].spotifyUrl} target={'_blank'}>
                <motion.img
                  initial={{ opacity: 0 }}
                  src={parsedSongs[6].cover}
                  className="w-24 h-24 md:w-32 md:h-32 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-sm"
                />
              </Link>
            </FloatingElement>
            <FloatingElement depth={1} className="top-[60%] left-[30%]">
              <Link href={parsedSongs[8].spotifyUrl} target={'_blank'}>
                <motion.img
                  initial={{ opacity: 0 }}
                  src={parsedSongs[8].cover}
                  className="w-24 h-24 md:w-32 md:h-32 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-sm"
                />
              </Link>
            </FloatingElement>
            <FloatingElement depth={1} className="top-[80%] left-[70%]">
              <Link href={parsedSongs[9].spotifyUrl} target={'_blank'}>
                <motion.img
                  initial={{ opacity: 0 }}
                  src={parsedSongs[9].cover}
                  className="w-24 h-24 md:w-32 md:h-32 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-sm"
                />
              </Link>
            </FloatingElement>
          </Floating>
        </Transition>
      </Transition>
    </>
  );
}
