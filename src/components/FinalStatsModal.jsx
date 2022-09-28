import cx from 'clsx';
import {  useWordle } from '@hooks';
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

export function FinalStatsModal({onClose}) {
  const {
    state: { guessDistribution, currPos },
    resetGameState,
  } = useWordle();


  function onReset() {
    resetGameState();
    onClose?.()
  }

  return (
      <div className="flex flex-col items-center justify-center">
        <ul className="mb-2 w-full">
          {guessDistribution.map((score, index) => {
            return (
              <li
                key={`stats-${index}`}
                className="mx-10 mb-1 flex text-sm font-semibold"
              >
                <div className="mr-2 font-mono">{index + 1}</div>
                <div
                  className={cx(
                    'flex items-center text-white',
                    score > 0
                      ? [
                          `w-full justify-end pr-3`,
                          currPos.x === index
                            ? 'bg-green-50 dark:bg-green-100'
                            : 'bg-gray-60 dark:bg-gray-80',
                        ]
                      : 'w-[7%] justify-center bg-gray-80',
                  )}
                >
                  {score}
                </div>
              </li>
            );
          })}
        </ul>
        <Button onClick={onReset}>
          Try a new word <IconArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
  );
}
