'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const LeafletMapContainer = dynamic(
  () => import('./LeafletMapContainer'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[400px] bg-slate-900/80 animate-pulse rounded-2xl flex items-center justify-center border border-slate-800">
        <div className="text-center text-slate-400">
          <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm font-medium">Loading Interactive Hospital Navigation Map...</p>
        </div>
      </div>
    )
  }
);

export default function DynamicMap(props) {
  return <LeafletMapContainer {...props} />;
}
