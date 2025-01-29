import { constMoods } from '@/lib/constMoods';
import Transition from '../transition';
import { ArrowRight, RotateCw } from 'lucide-react';
import VariableFontHoverByLetter from '../variable-font-hover-by-letter';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { useStageStore } from '@/store/store';

export function MoodSelectStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { nextStage } = useStageStore((state) => state);
  return (
    <>
      <Transition latency={0.1} className="text-4xl font-bold text-orange-700">
        Choose the max 5 moods that you feel
      </Transition>
      <Transition latency={0.1}>
        <div
          ref={containerRef}
          className="w-full h-full flex flex-wrap items-center justify-between gap-2 gap-y-3 prose text-left"
        >
          {constMoods.map((text, i) =>
            text === 'guilty' ? (
              <span
                key={i}
                className="text-2xl leading-none font-bold cursor-pointer text-orange-600"
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
                staggerDuration={0.05}
                transition={{
                  duration: 0.5,
                  type: 'spring',
                }}
                fromFontVariationSettings="'wght' 300, 'slnt' -10"
                toFontVariationSettings="'wght' 900, 'slnt' -10"
                onClick={() => console.log(text)}
              />
            ),
          )}
        </div>
      </Transition>
      <Transition
        latency={0.1}
        className="w-screen flex justify-center items-center gap-6"
      >
        <div className="group flex justify-center items-center gap-2 bg-orange-200 text-orange-500 px-6 py-2 cursor-pointer rounded-full select-none active:font-semibold active:bg-orange-300/90 active:translate-y-0.5 active:transition-all">
          <span className="text-xl">Reload</span>
          <RotateCw className="w-4 h-4 group-active:animate-spin" />
        </div>
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
