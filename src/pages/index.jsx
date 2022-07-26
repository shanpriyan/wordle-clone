import { useCallback, useEffect } from 'react';
import { Seo, Board, Header, Keyboard } from '@components';
import { useModal, useToast, useWordle } from '@hooks';
import { BACKSPACE, COLUMN_COUNT, ENTER, MODAL_TYPE } from '@constants';
import { getLetterStatus, isAlphabet } from '@utils';

export default function Home() {
  const { dispatchModal } = useModal();
  const { showMultiToast, showSingleToast } = useToast();

  const {
    state: {
      currPos: { x, y },
      board,
      isGameOver,
      keyState,
      tileState,
      wordToBeGuessed,
      isRestored,
    },
    setCurrPos,
    setBoard,
    setTileState,
    setGameOver,
    setKeyState,
    dictionary,
  } = useWordle();

  useEffect(() => {
    /**
     * Show stats modal only on mount after retrieving data
     * from local storage, if game was already over.
     *  */
    if (isRestored && isGameOver) {
      const timerId = setTimeout(() => {
        dispatchModal({ type: MODAL_TYPE.FINAL_STATS });
      }, 300);
      return () => clearTimeout(timerId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatchModal, isRestored]);

  const onEnter = useCallback(() => {
    if (y < 5) {
      showMultiToast('Not enough letters');
      return;
    }

    const currentAttempt = board[x].join('');
    if (!dictionary.wordleDictionarySet.has(currentAttempt)) {
      showMultiToast('Not in word list');
      return;
    }

    const {
      tileState: _tileState,
      keyState: _keyState,
      isGameOver,
    } = getLetterStatus(board[x], x, keyState, tileState, wordToBeGuessed);

    setTileState(_tileState);
    setKeyState(_keyState);
    setGameOver(isGameOver);
    setCurrPos({ x: x + 1, y: 0 });
    if (isGameOver) {
      showSingleToast(wordToBeGuessed.toUpperCase(), 1500, () => {
        dispatchModal({ type: MODAL_TYPE.FINAL_STATS });
      });
    }
  }, [
    board,
    dictionary,
    keyState,
    dispatchModal,
    setCurrPos,
    setGameOver,
    setKeyState,
    setTileState,
    showMultiToast,
    tileState,
    showSingleToast,
    wordToBeGuessed,
    x,
    y,
  ]);

  const onBackspace = useCallback(() => {
    if (y === 0) return;
    const tempBoard = board.map(arr => [...arr]);
    tempBoard[x][y - 1] = '';
    setBoard(tempBoard);
    setCurrPos({ y: y - 1 });
  }, [setBoard, setCurrPos, x, y, board]);

  const addLetterToBoard = useCallback(
    letter => {
      if (y > COLUMN_COUNT - 1) return;
      const tempBoard = board.map(arr => [...arr]);
      tempBoard[x][y] = letter.toLowerCase();
      setBoard(tempBoard);
      setCurrPos({ y: y + 1 });
    },
    [setBoard, setCurrPos, x, y, board],
  );

  const handleKeyPress = useCallback(
    key => {
      if (isGameOver) {
        dispatchModal({ type: MODAL_TYPE.FINAL_STATS });
        return;
      }

      if (key === ENTER) {
        onEnter();
      } else if (key === BACKSPACE) {
        onBackspace();
      } else if (isAlphabet(key)) {
        addLetterToBoard(key);
      }
    },
    [isGameOver, onEnter, onBackspace, addLetterToBoard, dispatchModal],
  );

  return (
    <div className="h-full w-full">
      <Seo />
      <Header />
      <div className="mx-auto flex h-app-content w-full max-w-lg flex-col items-center">
        <Board />
        <Keyboard handleKeyPress={handleKeyPress} />
      </div>
    </div>
  );
}
