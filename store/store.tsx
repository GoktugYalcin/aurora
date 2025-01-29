"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type StageStore,
  createStageStore,
  initStageStore,
} from "@/store/stage-store";

export type StageStoreApi = ReturnType<typeof createStageStore>;

export const StageStoreContext = createContext<StageStoreApi>(
  {} as StageStoreApi
);

export interface StageStoreProviderProps {
  children: ReactNode;
}

export const StageStoreProvider = ({ children }: StageStoreProviderProps) => {
  const storeRef = useRef<StageStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createStageStore(initStageStore());
  }

  return (
    <StageStoreContext.Provider value={storeRef.current}>
      {children}
    </StageStoreContext.Provider>
  );
};

export const useStageStore = <T,>(selector: (store: StageStore) => T): T => {
  const stageStoreContext = useContext(StageStoreContext);

  return useStore(stageStoreContext, selector);
};
