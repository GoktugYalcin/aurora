import { useRef } from 'react';

import { ArrowRight, RotateCw } from 'lucide-react';

import { cn } from '@/lib/utils';

import { useStageStore } from '@/store/store';

import Transition from '../transition';
import VariableFontHoverByLetter from '../variable-font-hover-by-letter';

export function MoodSelectStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { nextStage, moods, selectedMoods, toggleSelectedMood } = useStageStore(
    (state) => state,
  );

  return (
    <>
      <Transition latency={0.1} className="text-4xl font-bold text-orange-700">
        Choose the max 5 moods that you feel
      </Transition>
      <Transition latency={0.1}>
        <div
          ref={containerRef}
          className="w-full h-full flex flex-wrap justify-between gap-2 gap-y-4 prose text-center select-none"
        >
          {moods.map((text, i) =>
            selectedMoods.includes(text) ? (
              <span
                key={i}
                className="text-2xl leading-none font-bold cursor-pointer text-orange-600"
                onClick={() => toggleSelectedMood(text)}
              >
                {text}
              </span>
            ) : (
              <VariableFontHoverByLetter
                key={i}
                label={text}
                className={cn(
                  'text-2xl leading-none font-[300] cursor-pointer text-orange-600',
                )}
                staggerDuration={0.03}
                transition={{
                  duration: 0.5,
                  type: 'spring',
                }}
                fromFontVariationSettings="'wght' 300, 'slnt' 0"
                toFontVariationSettings="'wght' 900, 'slnt' -10"
                onClick={() => toggleSelectedMood(text)}
              />
            ),
          )}
        </div>
      </Transition>
      <Transition
        latency={0.1}
        className="w-screen flex justify-center items-center gap-6"
      >
        {/*<div className="group flex justify-center items-center gap-2 bg-orange-200 text-orange-500 px-6 py-2 cursor-pointer rounded-full select-none active:font-semibold active:bg-orange-300/90 active:translate-y-0.5 active:transition-all">
          <span className="text-xl">Reload</span>
          <RotateCw className="w-4 h-4 group-active:animate-spin" />
        </div>*/}
        <div
          className="group flex justify-center items-center gap-2 bg-orange-200 text-orange-500 px-6 py-2 cursor-pointer rounded-full select-none active:font-semibold active:bg-orange-300/90 active:translate-y-0.5 active:transition-all"
          onClick={() => nextStage()}
        >
          <span className="text-xl">Next</span>
          <ArrowRight className="w-4 h-4 group-hover:animate-bounce transition-all" />
        </div>
      </Transition>
    </>
  );
}
