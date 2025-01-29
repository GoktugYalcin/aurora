import { constMoods } from "@/lib/constMoods";
import Transition from "../transition";
import { ArrowRight, ListMusic, RotateCw } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import ScrambleHover from "@/components/scramble-hover";

import ScrambleIn, { ScrambleInHandle } from "../scramble-in";
import { constSongs } from "@/lib/constSongs";
import { useStageStore } from "@/store/store";

export function ListSongsStage() {
  const scrambleRefs = useRef<(ScrambleInHandle | null)[]>([]);
  const { stage } = useStageStore((state) => state);

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
        className={cn("text-4xl font-bold", {
          [`text-${stage.colorName}-700`]: true,
        })}
      >
        There it is! We select the songs for your mood:
      </Transition>
      <Transition latency={0.4} className="w-1/2">
        <div className="w-full h-full flex flex-col items-start justify-start gap-y-3">
          {constSongs.map((text, index) => (
            <motion.div
              layout
              key={index}
              animate={{ opacity: [0, 1, 1], y: [10, 10, 0] }}
              transition={{
                duration: 0.1,
                ease: "circInOut",
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
                  "text-2xl leading-none font-[300] cursor-pointer",
                  {
                    "text-orange-600": stage.colorName === "orange",
                    "text-blue-600": stage.colorName === "blue",
                  }
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
            "group flex justify-center items-center gap-2 bg-orange-200 text-orange-500 px-6 py-2 cursor-pointer rounded-full select-none active:font-semibold active:bg-orange-300/90 active:translate-y-0.5 active:transition-all",
            {
              "bg-blue-200": stage.colorName === "blue",
              "text-blue-500": stage.colorName === "blue",
              "active:bg-blue-300/90": stage.colorName === "blue",
              "bg-orange-200": stage.colorName === "orange",
              "text-orange-500": stage.colorName === "orange",
              "active:bg-orange-300/90": stage.colorName === "orange",
            }
          )}
        >
          <span className="text-xl">Generate List</span>
          <ListMusic className="w-4 h-4 group-hover:animate-bounce transition-all" />
        </div>
      </Transition>
    </>
  );
}
