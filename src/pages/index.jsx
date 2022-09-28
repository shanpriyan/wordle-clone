import { useCallback, useEffect } from 'react';
import { Seo, Board, Header, Keyboard,FinalStatsModal } from '@components';
import { useModal, useToast, useWordle } from '@hooks';
import { BACKSPACE, COLUMN_COUNT, ENTER, MODAL_TYPE } from '@constants';
import { getLetterStatus, isAlphabet, calculateFinalStats } from '@utils';

export default function Home() {
  const { setModalContent } = useModal();
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
      guessDistribution,
    },
    setCurrPos,
    setBoard,
    setTileState,
    setGameOver,
    setKeyState,
    dictionary,
    setFinalStats,
  } = useWordle();

  const showFinalStatsModal = useCallback(() => {
    setModalContent({
      renderContent(onClose) {
        return <FinalStatsModal onClose={onClose} />;
      },
      title: 'Guess Distribution',
    })
  },[setModalContent])

  useEffect(() => {
    /**
     * Show stats modal only on mount after retrieving data
     * from local storage, if game was already over.
     *  */
    if (isRestored && isGameOver) {
      const timerId = setTimeout(() => {
        showFinalStatsModal()
      }, 300);
      return () => clearTimeout(timerId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showFinalStatsModal, isRestored]);

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
    setFinalStats(calculateFinalStats(_tileState, guessDistribution));
    if (!isGameOver) setCurrPos({ x: x + 1, y: 0 });
    if (isGameOver) {
      showSingleToast(wordToBeGuessed.toUpperCase(), 1500, () => {
        showFinalStatsModal()
      });
    }
  }, [
    board,
    dictionary,
    keyState,
    guessDistribution,
    showFinalStatsModal,
    setCurrPos,
    setGameOver,
    setKeyState,
    setTileState,
    setFinalStats,
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
        showFinalStatsModal()
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
    [isGameOver, onEnter, onBackspace, addLetterToBoard, showFinalStatsModal],
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
