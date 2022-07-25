import { useEffect, useRef } from 'react';
import cx from 'clsx';
import { useWordle } from '@hooks';
import { TILE_COLOR, TILE_BORDER_COLOR } from '@constants';

export function Tile({ children, willAnimate, className, state }) {
  return (
    <div
      className={cx(
        'flex select-none items-center justify-center border-2 text-3xl font-bold uppercase',
        {
          'animate-cell-pop': willAnimate,
        },
        className,
        TILE_COLOR[state],
        TILE_BORDER_COLOR[state] ??
          (children
            ? 'border-gray-50 dark:border-gray-100'
            : 'border-gray-30 dark:border-black-10'),
        state ? 'text-white' : 'text-black dark:text-white',
      )}
    >
      {children}
    </div>
  );
}

export function Board() {
  const {
    state: {
      board,
      tileState,
      currPos: { x, y },
    },
  } = useWordle();

  const prevPos = useRef({ x, y });

  useEffect(() => {
    prevPos.current = { x, y };
  }, [x, y]);

  function renderBoard() {
    return board.map((row, rowIndex) =>
      row.map((letter, colIndex) => {
        return (
          <Tile
            key={`cell-${rowIndex}${colIndex}`}
            state={tileState[rowIndex][colIndex]}
            willAnimate={
              rowIndex === x && colIndex === y - 1 && !(prevPos.current.y > y)
            }
          >
            {letter}
          </Tile>
        );
      }),
    );
  }

  return (
    <div className="flex w-full flex-grow items-center justify-center">
      <div className="grid h-[372px] w-80 max-w-xs grid-cols-5 grid-rows-6 gap-[5px] p-2">
        {renderBoard()}
      </div>
    </div>
  );
}
