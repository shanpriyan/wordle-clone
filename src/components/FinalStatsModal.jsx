import cx from 'clsx';
import { Modal } from './';
import { useModal, useWordle } from '@hooks';
import { calculateFinalStats } from '@utils';
import { IconArrowRight } from '@icons';

function Button({ children, className, ...rest }) {
  return (
    <button
      className={cx(
        'flex w-fit cursor-pointer items-center rounded-md bg-green-50 p-2 text-lg font-semibold text-white',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function FinalStatsModal() {
  const {
    state: { tileState },
    resetGameState,
  } = useWordle();

  const { dispatchModal } = useModal();

  function handleGameOver() {
    resetGameState();
    dispatchModal({ isVisible: false });
  }

  return (
    <Modal title="LAST WORD GUESS">
      <div className="flex flex-col items-center justify-center">
        <ul className="mb-2 w-full">
          {calculateFinalStats(tileState).map((isCorrect, i) => (
            <li
              key={`stats-${i}`}
              className="mx-10 mb-1 flex text-sm font-semibold"
            >
              <div className="mr-2 font-mono">{i + 1}</div>
              <div
                className={cx(
                  'flex items-center text-white',
                  isCorrect
                    ? 'w-full justify-end bg-green-50 pr-3 dark:bg-green-100'
                    : 'w-[7%] justify-center bg-gray-80',
                )}
              >
                {isCorrect ? '1' : '0'}
              </div>
            </li>
          ))}
        </ul>
        <Button onClick={handleGameOver}>
          Try a new word <IconArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </Modal>
  );
}
