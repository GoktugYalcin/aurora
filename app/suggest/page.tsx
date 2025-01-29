"use client";
import VariableFontCursorProximity from "@/components/variable-font-cursor-proximity";
import VariableFontHoverByLetter from "@/components/variable-font-hover-by-letter";
import { ArrowRight, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { constMoods } from "@/lib/constMoods";
import dynamic from "next/dynamic";
import Transition from "@/components/transition";
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
      <AnimatedGradient colors={colorArr} speed={0.15} blur="heavy" />
      <AnimatePresence mode="wait">
        {stage.type === "selection" && <MoodSelectStage key="selection" />}
        {stage.type === "listing" && <ListSongsStage key="listing" />}
      </AnimatePresence>
    </main>
  );
}
