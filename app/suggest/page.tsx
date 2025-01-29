"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { MoodSelectStage } from "@/components/stages/mood-select-stage";
import { ListSongsStage } from "@/components/stages/list-songs-stage";
import { useStageStore } from "@/store/store";
import { AnimatePresence } from "motion/react";

const AnimatedGradient = dynamic(
  () => import("../../components/animated-gradient-with-svg"),
  { ssr: false }
);

export default function SuggestPage() {
  const { stage } = useStageStore((state) => state);
  const [colorArr, setColor] = useState<string[]>(stage.colors);

  useEffect(() => {
    setTimeout(() => {
      setColor(stage.colors);
    }, 300);
  }, [stage]);

  return (
    <main className="flex flex-col justify-center items-center w-full min-h-screen gap-20">
      <AnimatedGradient colors={colorArr} speed={0.12} blur="medium" />
      <AnimatePresence mode="wait">
        {stage.type === "selection" && <MoodSelectStage key="selection" />}
        {stage.type === "listing" && <ListSongsStage key="listing" />}
      </AnimatePresence>
    </main>
  );
}
