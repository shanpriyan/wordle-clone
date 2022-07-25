import { useContext } from 'react';
import { ModalContext } from '@contexts';

export function useModal() {
  const ctx = useContext(ModalContext);
  if (ctx === undefined) {
    throw Error('useModal should be used inside ModalContext');
  }
  return ctx;
}
