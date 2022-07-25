import { createContext, createElement, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { MODAL_TYPE } from '@constants';

const FinalStatsModal = dynamic(
  () => import('@components').then(comp => comp.FinalStatsModal),
  {
    ssr: false,
  },
);
const HelpModal = dynamic(
  () => import('@components').then(comp => comp.HelpModal),
  {
    ssr: false,
  },
);

export const ModalContext = createContext();
const { FINAL_STATS, HELP } = MODAL_TYPE;

const modalsMap = {
  [FINAL_STATS]: FinalStatsModal,
  [HELP]: HelpModal,
};

export function ModalProvider({ children }) {
  const [isModalVisible, setModalVisibility] = useState(false);
  const [modalType, setModalType] = useState(null);

  const dispatchModal = useCallback(({ type = null, isVisible = true }) => {
    setModalType(type);
    setModalVisibility(isVisible);
  }, []);

  return (
    <ModalContext.Provider value={{ dispatchModal }}>
      {isModalVisible && createElement(modalsMap[modalType] ?? (() => null))}
      {children}
    </ModalContext.Provider>
  );
}
