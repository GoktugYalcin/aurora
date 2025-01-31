import React from 'react';

import Transition from '@/components/transition';

export function ListSongsSkeleton() {
  return (
    <Transition latency={0.4} className="w-1/2 animate-pulse">
      <div className="h-5 bg-blue-400/80 rounded-full dark:bg-gray-700 mb-4 max-w-[410px]"></div>
      <div className="h-5 bg-blue-400/80 rounded-full dark:bg-gray-700 mb-4 max-w-[650px]"></div>
      <div className="h-5 bg-blue-400/80 rounded-full dark:bg-gray-700 mb-4 max-w-[340px]"></div>
      <div className="h-5 bg-blue-400/80 rounded-full dark:bg-gray-700 mb-4 max-w-[680px]"></div>
      <div className="h-5 bg-blue-400/80 rounded-full dark:bg-gray-700 mb-4 max-w-[630px]"></div>
      <div className="h-5 bg-blue-400/80 rounded-full dark:bg-gray-700 mb-4 max-w-[640px]"></div>
      <div className="h-5 bg-blue-400/80 rounded-full dark:bg-gray-700 mb-4 max-w-[660px]"></div>
      <div className="h-5 bg-blue-400/80 rounded-full dark:bg-gray-700 mb-4 max-w-[270px]"></div>
      <div className="h-5 bg-blue-400/80 rounded-full dark:bg-gray-700 mb-4 max-w-[690px]"></div>
      <div className="h-5 bg-blue-400/80 rounded-full dark:bg-gray-700 mb-4 max-w-[290px]"></div>
    </Transition>
  );
}
