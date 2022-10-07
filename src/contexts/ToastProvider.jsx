import dynamic from 'next/dynamic';
import {createContext, useRef, useState, useCallback} from 'react';

const ToastContainer = dynamic(
  () => import('@components').then(comp => comp.ToastContainer),
  {
    ssr: false,
  }
);

export const ToastContext = createContext();

const TOAST_DURATION = 300;
const MAX_TOAST = 6;

export function ToastProvider({children}) {
  const [queue, setQueue] = useState([]);
  const intervalId = useRef();
  const timerId = useRef();

  const processQueue = useCallback((duration, onComplete) => {
    clearInterval(intervalId.current);

    intervalId.current = setInterval(() => {
      setQueue(currQueue => {
        if (!currQueue.length) {
          onComplete?.();
          clearInterval(intervalId.current);
          return currQueue;
        }
        const tempQueue = [...currQueue];
        tempQueue.pop();
        return tempQueue;
      });
    }, duration);
  }, []);

  const showMultiToast = useCallback(
    (text, duration = TOAST_DURATION, onComplete) => {
      if (queue.length === MAX_TOAST) return;
      setQueue(currQueue => [{text, id: Date.now()}, ...currQueue]);
      processQueue(duration, onComplete);
    },
    [queue, processQueue]
  );

  const showSingleToast = useCallback(
    (text, duration = TOAST_DURATION, onComplete) => {
      clearTimeout(timerId.current);

      setQueue([{text, id: Date.now()}]);
      timerId.current = setTimeout(() => {
        onComplete?.();
        setQueue([]);
      }, duration);
    },
    []
  );

  return (
    <ToastContext.Provider value={{showMultiToast, showSingleToast}}>
      <ToastContainer queue={queue} />
      {children}
    </ToastContext.Provider>
  );
}
