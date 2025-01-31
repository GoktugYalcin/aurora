'use client';

import React, { useRef } from 'react';

import dynamic from 'next/dynamic';

import { AuthenticationStage } from '@/components/stages/authentication-stage';

import { SparklesText } from '@/components/sparkles-text';
import VariableFontCursorProximity from '@/components/variable-font-cursor-proximity';

const AnimatedGradient = dynamic(
  () => import('../components/animated-gradient-with-svg'),
  { ssr: false },
);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  if (!containerRef) {
    return <></>;
  }
  return (
    <>
      <div className="min-h-screen z-30 relative w-full flex flex-col justify-start items-center pt-28 px-72 gap-12">
        <h1 className="text-4xl flex justify-center items-center gap-2 font-bold">
          Welcome to
          <SparklesText
            className="text-4xl font-[Outfit]"
            text="Aurora"
            sparklesCount={6}
          />
        </h1>

        <div className="flex flex-col justify-start items-start px-60 pt-8">
          <span className="font-semibold text-xl mb-2">What is it?</span>
          <div
            ref={containerRef}
            className="flex flex-col justify-start text-slate-950 items-start gap-3"
          >
            <VariableFontCursorProximity
              label={`Music has the power to transform emotions, and Aurora helps you find the perfect songs to match your vibe. Whether you're feeling energetic, nostalgic, relaxed, or inspired, Aurora curates a personalized playlist just for you.`}
              className="leading-tight prose text-xs sm:text-sm md:text-base lg:text-lg text-slate-950"
              fromFontVariationSettings="'wght' 400, 'slnt' 0"
              toFontVariationSettings="'wght' 900, 'slnt' -10"
              falloff="exponential"
              radius={70}
              containerRef={containerRef}
            />
            <VariableFontCursorProximity
              label={`✨ How it works:`}
              className="leading-tight text-xs sm:text-sm md:text-base lg:text-lg"
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
                className="leading-tight text-xs sm:text-sm md:text-base lg:text-lg"
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
                className="leading-tight text-xs sm:text-sm md:text-base lg:text-lg"
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
                className="leading-tight text-xs sm:text-sm md:text-base lg:text-lg"
                fromFontVariationSettings="'wght' 500, 'slnt' 0"
                toFontVariationSettings="'wght' 900, 'slnt' -10"
                falloff="exponential"
                radius={70}
                containerRef={containerRef}
              />
            </span>
            <div className="flex justify-center items-center pt-12 flex-col w-full gap-2">
              <h2 className="text-2xl font-bold text-center">
                Let Aurora be your personal DJ.
              </h2>
              <h2 className="text-2xl font-bold text-center mb-6">
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
