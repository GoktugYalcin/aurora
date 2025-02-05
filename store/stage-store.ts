import { SpotifyTrack } from '@/types/spotify';
import { createStore } from 'zustand/vanilla';

import { constMoods } from '@/lib/constMoods';
import { constSongs } from '@/lib/constSongs';

export type Stage = {
  type: string;
  colors: string[];
  colorName: string;
};

export type Playlist = {
  playlistId: string;
  playlistName: string;
  playlistDescription: string;
  totalTracks: string;
  playlistImage: string;
  playlistUrl: string;
};

export type StageState = {
  stage: Stage;
  moods: string[];
  selectedMoods: string[];
  songs: string[];
  parsedSongs: SpotifyTrack[];
  playlistName: string;
  playlistProps?: Playlist;
};

export type StageActions = {
  nextStage: () => void;
  prevStage: () => void;
  reset: () => void;
  setPlaylistName: (name: string) => void;
  setParsedSongs: (songs: SpotifyTrack[]) => void;
  toggleSelectedMood: (mood: string) => void;
  setPlaylistProps: (playlist: Playlist) => void;
};

export type StageStore = StageState & StageActions;

const stages: Stage[] = [
  {
    type: 'selection',
    colors: ['#FFC461', '#FADA7A', '#FFC785'],
    colorName: 'orange',
  },
  {
    type: 'listing',
    colors: ['#61A9FF', '#7AB2FA', '#85B7FF'],
    colorName: 'blue',
  },
  {
    type: 'playlist',
    colors: ['#4DBF88', '#66B874', '#70BE7D'],
    colorName: 'green',
  },
];

export const initStageStore = (): StageState => {
  return {
    stage: stages[0],
    moods: constMoods ?? [],
    selectedMoods: [],
    songs: constSongs ?? [],
    parsedSongs: [],
    playlistName: '',
  };
};

export const createStageStore = (initState: StageState) => {
  return createStore<StageStore>()((set) => ({
    ...initState,
    nextStage: () =>
      set((state) => {
        const findIndexCur = stages.findIndex((i) => i === state.stage);
        if (findIndexCur > -1 && stages[findIndexCur + 1]) {
          return { stage: stages[findIndexCur + 1] };
        }
        return {};
      }),
    prevStage: () =>
      set((state) => {
        const findIndexCur = stages.findIndex((i) => i === state.stage);
        if (findIndexCur > -1 && stages[findIndexCur - 1]) {
          return { stage: stages[findIndexCur - 1] };
        }
        return {};
      }),
    toggleSelectedMood: (mood: string) =>
      set((state) => {
        const moodIsAvailable = state.selectedMoods.includes(mood);
        if (moodIsAvailable) {
          return {
            selectedMoods: state.selectedMoods.filter(
              (selectedMood) => selectedMood !== mood,
            ),
          };
        }
        if (state.selectedMoods.length === 5) {
          return { selectedMoods: state.selectedMoods };
        }
        return { selectedMoods: [...state.selectedMoods, mood] };
      }),
    setParsedSongs: (parsedSongs: SpotifyTrack[]) =>
      set((state) => {
        return { parsedSongs };
      }),
    setPlaylistName: (name: string) =>
      set((state) => {
        return { playlistName: name };
      }),
    setPlaylistProps: (playlist: Playlist) =>
      set((state) => {
        return { playlistProps: playlist };
      }),
    reset: () => set(initStageStore),
  }));
};
