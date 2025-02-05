'use client';

import React, { useEffect, useRef } from 'react';

import dynamic from 'next/dynamic';

import { AuthenticationStage } from '@/components/stages/authentication-stage';

import { SparklesText } from '@/components/sparkles-text';
import VariableFontCursorProximity from '@/components/variable-font-cursor-proximity';

import { useStageStore } from '@/store/store';

const AnimatedGradient = dynamic(
  () => import('../components/animated-gradient-with-svg'),
  { ssr: false },
);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { reset } = useStageStore((state) => state);
  useEffect(() => {
    reset();
  }, []);
  if (!containerRef) {
    return <></>;
  }
  return (
    <>
      <div className="min-h-screen z-30 relative flex flex-col lg:justify-start justify-center items-center lg:pt-28 pt-12 lg:px-72 lg:gap-12 gap-4">
        <h1 className="lg:text-4xl text-2xl flex justify-center items-center gap-2 font-bold">
          Welcome to
          <SparklesText
            className="lg:text-4xl text-2xl font-[Outfit]"
            text="Aurora"
            sparklesCount={6}
          />
        </h1>

        <div className="flex flex-col justify-start items-start lg:px-60 px-12 w-full lg:pt-8 pt-3">
          <span className="font-semibold text-xl mb-2">What is it?</span>
          <div
            ref={containerRef}
            className="flex flex-col justify-start text-slate-950 items-start gap-3 flex-wrap"
          >
            <VariableFontCursorProximity
              label={`Music has the power to transform emotions, and Aurora helps you find the perfect songs to match your vibe. Whether you're feeling energetic, nostalgic, relaxed, or inspired, Aurora curates a personalized playlist just for you.`}
              className="leading-tight prose text-base lg:text-lg text-slate-950 flex-wrap"
              fromFontVariationSettings="'wght' 400, 'slnt' 0"
              toFontVariationSettings="'wght' 900, 'slnt' -10"
              falloff="exponential"
              radius={70}
              containerRef={containerRef}
            />
            <VariableFontCursorProximity
              label={`✨ How it works:`}
              className="leading-tight text-sm sm:text-sm md:text-base lg:text-lg"
              fromFontVariationSettings="'wght' 600, 'slnt' 0"
              toFontVariationSettings="'wght' 900, 'slnt' -10"
              falloff="exponential"
              radius={70}
              containerRef={containerRef}
            />
            <span className="flex items-center gap-3 justify-start text-green-800">
              <span className="flex items-center">&#8226;</span>
              <VariableFontCursorProximity
                label={`Select Your Mood – Choose from a variety of moods that match your feelings.`}
                className="leading-tight text-sm sm:text-sm md:text-base lg:text-lg"
                fromFontVariationSettings="'wght' 500, 'slnt' 0"
                toFontVariationSettings="'wght' 900, 'slnt' -10"
                falloff="exponential"
                radius={70}
                containerRef={containerRef}
              />
            </span>
            <span className="flex items-center gap-3 justify-start text-green-800">
              <span className="flex items-center">&#8226;</span>
              <VariableFontCursorProximity
                label={`Discover Songs – Let Aurora generate the best songs from Spotify based on your selection.`}
                className="leading-tight text-sm sm:text-sm md:text-base lg:text-lg"
                fromFontVariationSettings="'wght' 500, 'slnt' 0"
                toFontVariationSettings="'wght' 900, 'slnt' -10"
                falloff="exponential"
                radius={70}
                containerRef={containerRef}
              />
            </span>
            <span className="flex items-center gap-3 justify-start text-green-800">
              <span className="flex items-center">&#8226;</span>
              <VariableFontCursorProximity
                label={`Create Playlists – Save your favorite tracks as a playlist directly to your Spotify account.`}
                className="leading-tight text-sm sm:text-sm md:text-base lg:text-lg"
                fromFontVariationSettings="'wght' 500, 'slnt' 0"
                toFontVariationSettings="'wght' 900, 'slnt' -10"
                falloff="exponential"
                radius={70}
                containerRef={containerRef}
              />
            </span>
            <div className="flex justify-center items-center lg:pt-12 flex-col w-full gap-2">
              <h2 className="lg:block hidden text-2xl font-bold text-center">
                Let Aurora be your personal DJ.
              </h2>
              <h2 className="lg:block hidden text-2xl font-bold text-center mb-6">
                Start your journey through sound today.
              </h2>
              <AuthenticationStage />
            </div>
          </div>
        </div>
      </div>
      <AnimatedGradient
        colors={['#4DBF88', '#66B874', '#70BE7D']}
        speed={0.12}
        blur="heavy"
      />
    </>
  );
}
