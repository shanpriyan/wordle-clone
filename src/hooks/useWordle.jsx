import { useContext } from 'react';
import { WordleContext } from '@contexts';

export function useWordle() {
  const ctx = useContext(WordleContext);
  if (ctx === undefined) {
    throw Error('useWordle should be used inside WordleProvider');
  }
  return ctx;
}
