import { createContext, useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';

const Modal = dynamic(() => import('@components').then(comp => comp.Modal), {
  ssr: false,
});

export const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modalData, setModalData] = useState(null);

  const onClose = useCallback(() => {
    setModalData(null);
  }, []);

  const renderModal = useMemo(() => {
    if (!modalData) return null;

    const { title, renderContent } = modalData;

    return (
      <Modal title={title} onClose={onClose}>
        {renderContent}
      </Modal>
    );
  }, [modalData,onClose]);

  const setModalContent = useCallback(
    ({ renderContent, title }) => {
      setModalData({ title, renderContent: renderContent(onClose) });
    },
    [onClose],
  );

  return (
    <ModalContext.Provider value={{ setModalContent }}>
      {renderModal}
      {children}
    </ModalContext.Provider>
  );
}
