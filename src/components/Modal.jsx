import { Portal } from '.';
import { IconClose } from '@icons';
import { useModal } from '@hooks';

export function Modal({ children, onClose, title }) {
  const { dispatchModal } = useModal();

  function handleClose() {
    onClose?.();
    dispatchModal({ isVisible: false });
  }

  return (
    <Portal className="absolute left-1/2 z-10 flex h-full w-full -translate-x-1/2 items-center justify-center bg-white-20 bg-opacity-60 dark:bg-black-70 dark:bg-opacity-80">
      <div className="relative max-h-full w-[90%] max-w-lg">
        <div className="w-full overflow-y-auto rounded-lg  bg-gray-20 p-4 dark:bg-black-60">
          <div className="pb-3">
            <h1 className="text-center font-bold">{title}</h1>
            <IconClose
              onClick={handleClose}
              className="absolute top-4 right-4 h-6 w-6 cursor-pointer"
            />
          </div>
          {children}
        </div>
      </div>
    </Portal>
  );
}
