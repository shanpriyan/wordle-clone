import dynamic from 'next/dynamic';
import React from 'react';

const Portal = dynamic(() => import('./Portal').then(comp => comp.Portal), {
  ssr: false,
});

function Toast({ children }) {
  return (
    <div className="rounded-md bg-black p-3 text-center text-sm font-bold text-white dark:bg-white dark:text-black-70">
      {children}
    </div>
  );
}

export function ToastContainer({ queue }) {
  return queue.length ? (
    <Portal className="absolute left-1/2 mt-14 flex h-1/2 w-full -translate-x-1/2 justify-center z-10">
      <div className="mt-3 flex flex-col gap-3">
        {queue.map(({ text, id }) => (
          <Toast key={id}>{text}</Toast>
        ))}
      </div>
    </Portal>
  ) : null;
}
