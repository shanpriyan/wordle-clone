import {useContext} from 'react';
import {ToastContext} from '@contexts';

export function useToast() {
  const ctx = useContext(ToastContext);
  if (ctx === undefined) {
    throw Error('useToast should be used inside ToastProvider');
  }
  return ctx;
}
