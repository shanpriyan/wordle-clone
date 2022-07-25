import { useEffect, useCallback, useMemo } from 'react';
import cx from 'clsx';
import { getKeyBgClr } from '@utils';
import { KEYBOARD, ENTER, BACKSPACE } from '@constants';
import { useWordle } from '@hooks';
import { IconBackspace } from '@icons';

function Container({ children }) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 px-2 pb-3 pt-1">
      {children}
    </div>
  );
}

function Row({ children, isSecondRow }) {
  return (
    <div className={cx('flex w-full gap-2', { 'px-[5%]': isSecondRow })}>
      {children}
    </div>
  );
}

function Key({ letter, children, handleKeyPress }) {
  const {
    state: { keyState },
  } = useWordle();

  const stateColor = useMemo(
    () => getKeyBgClr(keyState, letter),
    [letter, keyState],
  );

  const isEnterOrBackspace = letter === ENTER || letter === BACKSPACE;

  return (
    <button
      className={cx(
        'flex h-14 w-full cursor-pointer select-none items-center justify-center rounded-[4px] font-semibold uppercase focus:outline-none',
        stateColor ? 'text-white' : 'text-black dark:text-white',
        stateColor || 'bg-gray-30 dark:bg-gray-70',
        isEnterOrBackspace ? 'flex-[1.5]' : 'flex-1',
      )}
      onClick={e => handleKeyPress(letter, e)}
    >
      {children}
    </button>
  );
}

export function Keyboard({ handleKeyPress }) {
  function renderKey(letter) {
    if (letter === BACKSPACE) {
      return <IconBackspace height={24} width={24} />;
    }

    return letter;
  }

  const onKeyDown = useCallback(
    e => {
      if (e.ctrlKey) return;
      handleKeyPress(e.key);
    },
    [handleKeyPress],
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return (
    <Container>
      {KEYBOARD.map((row, rowIndex) => (
        <Row key={rowIndex} isSecondRow={rowIndex === 1}>
          {row.map(letter => (
            <Key key={letter} letter={letter} handleKeyPress={handleKeyPress}>
              {renderKey(letter)}
            </Key>
          ))}
        </Row>
      ))}
    </Container>
  );
}
