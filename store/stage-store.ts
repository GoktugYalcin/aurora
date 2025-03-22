import { SpotifyTrack } from '@/types/spotify';
import { createStore } from 'zustand/vanilla';

import { toast } from '@/hooks/use-toast';

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
  generatedCount: number;
};

export type StageActions = {
  nextStage: () => void;
  prevStage: () => void;
  reset: () => void;
  setPlaylistName: (name: string) => void;
  setSongs: (songs: string[]) => void;
  setParsedSongs: (songs: SpotifyTrack[]) => void;
  toggleSelectedMood: (mood: string) => void;
  setPlaylistProps: (playlist: Playlist) => void;
  setGeneratedCount: (count: number) => void;
  getSongs: (songs: string[]) => void;
  generateSongs: (moods: string[]) => void;
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
    songs: [],
    parsedSongs: [],
    playlistName: '',
    generatedCount: 0,
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
    setGeneratedCount: (count: number) =>
      set((state) => {
        return { generatedCount: count };
      }),
    setSongs: (songs: string[]) =>
      set((state) => {
        return { songs };
      }),
    getSongs: async (songs: string[]) =>
      set((state) => {
        try {
          const res = fetch('/api/find-songs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ songs }),
          })
            .then((res) => {
              if (!res.ok) {
                throw new Error(res.statusText);
              } else {
                return res.json();
              }
            })
            .then((dat) => {
              const data: { playlistName: string; songs: SpotifyTrack[] } = dat;

              console.log(data);

              state.setParsedSongs(data.songs);
              state.setPlaylistName(state.playlistName ?? 'Mood List #1');
            });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'Please, try again later.';
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: `There was a problem with your request: ${message ?? 'Please, try again later.'}`,
          });
        }
        return { ...state };
      }),
    generateSongs: async (moods: string[]) => {
      set((state) => {
        fetch('/api/generate-songs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ moods }),
        })
          .then((res) => res.json())
          .then((dat) => {
            const data = JSON.parse(dat.data);

            state.setPlaylistName(data.listName);
            state.setSongs(data.songs);
            state.getSongs(data.songs);
          });
        return { ...state };
      });
    },
  }));
};
