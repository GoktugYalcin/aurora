import { useEffect, useRef } from 'react';

import { ArrowRight } from 'lucide-react';

import { ListMoods } from '@/components/list-moods';
import { MessageBox } from '@/components/message-box';

import { useStageStore } from '@/store/store';

import Transition from '../transition';

export function MoodSelectStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    nextStage,
    generatedCount,
    setGeneratedCount,
    generateSongs,
    selectedMoods,
  } = useStageStore((state) => state);

  useEffect(() => {
    fetch('/api/check-generate-count', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        setGeneratedCount(res.data.generated_this_month);
      });
  }, []);

  return (
    <>
      {generatedCount >= 5 && (
        <MessageBox
          title={'Warning'}
          message={
            'You have reached monthly limit as 5, please try again on next month :('
          }
        />
      )}
      <Transition
        latency={0.1}
        className="lg:text-4xl text-xl font-bold text-orange-700 lg:px-0 lg:mt-0 mt-12 px-8 text-center"
      >
        Choose the max 5 moods that you feel
      </Transition>
      <Transition latency={0.1}>
        <div
          ref={containerRef}
          className="w-full h-full flex flex-wrap justify-between gap-2 gap-y-4 prose text-center select-none lg:px-0 px-12"
        >
          <ListMoods />
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
          onClick={() => {
            generateSongs(selectedMoods);
            nextStage();
          }}
        >
          <span className="text-xl">Next</span>
          <ArrowRight className="w-4 h-4 group-hover:animate-bounce transition-all" />
        </div>
      </Transition>
    </>
  );
}
