"use client";

import { SparklesText } from "@/components/sparkles-text";
import VariableFontCursorProximity from "@/components/variable-font-cursor-proximity";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div className="min-h-screen w-full flex flex-col justify-start items-center pt-36 px-72 gap-12">
      <h1 className="text-4xl flex justify-center items-center gap-2 font-bold">
        Welcome to
        <SparklesText className="text-4xl" text="Aurora" sparklesCount={6} />
      </h1>

      <div className="flex flex-col justify-start items-start px-60 pt-12">
        <span className="font-semibold text-xl mb-2">What is it?</span>
        <div
          ref={containerRef}
          className="flex flex-col justify-start items-start gap-3"
        >
          <VariableFontCursorProximity
            label={`Music has the power to transform emotions, and Aurora helps you find the perfect songs to match your vibe. Whether you're feeling energetic, nostalgic, relaxed, or inspired, Aurora curates a personalized playlist just for you.`}
            className="leading-tight text-xs sm:text-sm md:text-base lg:text-lg text-primaryRed"
            fromFontVariationSettings="'wght' 400, 'slnt' 0"
            toFontVariationSettings="'wght' 900, 'slnt' -10"
            falloff="exponential"
            radius={70}
            containerRef={containerRef}
          />
          <VariableFontCursorProximity
            label={`✨ How it works:`}
            className="leading-tight text-xs sm:text-sm md:text-base lg:text-lg"
            fromFontVariationSettings="'wght' 400, 'slnt' 0"
            toFontVariationSettings="'wght' 900, 'slnt' -10"
            falloff="exponential"
            radius={70}
            containerRef={containerRef}
          />
          <span className="flex items-center gap-3 justify-start text-orange-600">
            <span className="flex items-center">&#8226;</span>
            <VariableFontCursorProximity
              label={`Select Your Mood – Choose from a variety of moods that match your feelings.`}
              className="leading-tight text-xs sm:text-sm md:text-base lg:text-lg"
              fromFontVariationSettings="'wght' 400, 'slnt' 0"
              toFontVariationSettings="'wght' 900, 'slnt' -10"
              falloff="exponential"
              radius={70}
              containerRef={containerRef}
            />
          </span>
          <span className="flex items-center gap-3 justify-start text-orange-600">
            <span className="flex items-center">&#8226;</span>
            <VariableFontCursorProximity
              label={`Discover Songs – Let Aurora generate the best songs from Spotify based on your selection.`}
              className="leading-tight text-xs sm:text-sm md:text-base lg:text-lg"
              fromFontVariationSettings="'wght' 400, 'slnt' 0"
              toFontVariationSettings="'wght' 900, 'slnt' -10"
              falloff="exponential"
              radius={70}
              containerRef={containerRef}
            />
          </span>
          <span className="flex items-center gap-3 justify-start text-orange-600">
            <span className="flex items-center">&#8226;</span>
            <VariableFontCursorProximity
              label={`Create Playlists – Save your favorite tracks as a playlist directly to your Spotify account.`}
              className="leading-tight text-xs sm:text-sm md:text-base lg:text-lg"
              fromFontVariationSettings="'wght' 400, 'slnt' 0"
              toFontVariationSettings="'wght' 900, 'slnt' -10"
              falloff="exponential"
              radius={70}
              containerRef={containerRef}
            />
          </span>
          <div className="flex justify-center items-center pt-20 flex-col w-full gap-2">
            <h2 className="text-2xl font-bold text-center">
              Let Aurora be your personal DJ.
            </h2>
            <h2 className="text-2xl font-bold text-center mb-6">
              Start your journey through sound today.
            </h2>
            <Link
              href={"/suggest"}
              className="flex justify-center items-center gap-3 text-black px-6 py-4 text-lg bg-white hover:bg-slate-50 transition-colors rounded-full shadow cursor-pointer"
            >
              <Image
                src={"/spotify.svg"}
                alt="spotify"
                width={20}
                height={20}
              />
              <span>Login with Spotify </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
