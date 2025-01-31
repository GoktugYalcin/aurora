import React from 'react';

import Transition from '@/components/transition';

export function ListSongsSkeleton() {
  return (
    <Transition latency={0.4} className="w-1/2 animate-pulse">
      <div className="h-4 bg-blue-400/80 rounded dark:bg-gray-700 mb-4 max-w-[600px]"></div>
      <div className="h-4 bg-blue-400/80 rounded dark:bg-gray-700 mb-4 max-w-[650px]"></div>
      <div className="h-4 bg-blue-400/80 rounded dark:bg-gray-700 mb-4 max-w-[610px]"></div>
      <div className="h-4 bg-blue-400/80 rounded dark:bg-gray-700 mb-4 max-w-[680px]"></div>
      <div className="h-4 bg-blue-400/80 rounded dark:bg-gray-700 mb-4 max-w-[630px]"></div>
      <div className="h-4 bg-blue-400/80 rounded dark:bg-gray-700 mb-4 max-w-[640px]"></div>
      <div className="h-4 bg-blue-400/80 rounded dark:bg-gray-700 mb-4 max-w-[660px]"></div>
      <div className="h-4 bg-blue-400/80 rounded dark:bg-gray-700 mb-4 max-w-[600px]"></div>
      <div className="h-4 bg-blue-400/80 rounded dark:bg-gray-700 mb-4 max-w-[690px]"></div>
      <div className="h-4 bg-blue-400/80 rounded dark:bg-gray-700 mb-4 max-w-[670px]"></div>
      <div className="h-4 bg-blue-400/80 rounded dark:bg-gray-700 mb-4 max-w-[620px]"></div>
      <div className="h-4 bg-blue-400/80 rounded dark:bg-gray-700 mb-4 max-w-[700px]"></div>
    </Transition>
  );
}
