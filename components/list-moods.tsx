import React from 'react';

import VariableFontHoverByLetter from '@/components/variable-font-hover-by-letter';

import { cn } from '@/lib/utils';

import { useStageStore } from '@/store/store';

export const ListMoods: React.FC<{}> = () => {
  const { moods, selectedMoods, toggleSelectedMood } = useStageStore(
    (state) => state,
  );
  return moods.map((text, i) =>
    selectedMoods.includes(text) ? (
      <span
        key={i}
        className="lg:text-2xl text-sm leading-none font-bold cursor-pointer text-orange-600"
        onClick={() => toggleSelectedMood(text)}
      >
        {text}
      </span>
    ) : (
      <VariableFontHoverByLetter
        key={i}
        label={text}
        className={cn(
          'lg:text-2xl text-sm leading-none font-[300] cursor-pointer text-orange-600',
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
  );
};
