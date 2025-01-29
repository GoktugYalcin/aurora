import { constMoods } from '@/lib/constMoods'
import { constSongs } from '@/lib/constSongs'
import { createStore } from 'zustand/vanilla'

export type Stage = {
    type: string,
    colors: string[],
    colorName: string
}

export type StageState = {
  stage: Stage,
  moods: string[],
  songs: string[]
}

export type StageActions = {
  nextStage: () => void
  prevStage: () => void
}

export type StageStore = StageState & StageActions

const stages: Stage[] = [
        {
            type: "selection",
            colors: ["#FFC461", "#FADA7A", "#FFC785"],
            colorName: "orange"
        },
        {
            type: "listing",
            colors: ["#61A9FF", "#7AB2FA", "#85B7FF"],
            colorName: "blue"
        }]

export const initStageStore = (): StageState => {
  return { stage: stages[0], moods: constMoods, songs: constSongs }
}

export const createStageStore = (
  initState: StageState,
) => {
  return createStore<StageStore>()((set) => ({
    ...initState,
      nextStage: () => set((state) => {
          const findIndexCur = stages.findIndex(i => i === state.stage)
          if (findIndexCur > -1 && stages[findIndexCur + 1]) {
              return { stage: stages[findIndexCur + 1] }
          }
          return {}
    }),
    prevStage: () => set((state) => {
          const findIndexCur = stages.findIndex(i => i === state.stage)
          if (findIndexCur > -1 && stages[findIndexCur - 1]) {
              return { stage: stages[findIndexCur - 1] }
          }
        return {}
    }),
  }))
}
