import {
  createContext,
  useReducer,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { SET, LS_WORDLE_STATE_KEY } from './actions';
import { reducer } from './reducer';
import {
  initialBoard,
  initialTileState,
  TILE_STATUS,
  ROW_COUNT,
} from '@constants';
import { getWordleDictionary, getRandomWord } from '@utils';

export const WordleContext = createContext();

const { MISS, EXACT, ALMOST } = TILE_STATUS;

const initialState = {
  currPos: { x: 0, y: 0 },
  board: initialBoard,
  tileState: initialTileState,
  keyState: {
    [MISS]: [],
    [EXACT]: [],
    [ALMOST]: [],
  },
  isGameOver: false,
  wordToBeGuessed: '',
  guessDistribution: Array(ROW_COUNT).fill(0),
};

export function WordleProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [dictionary, setDictionary] = useState({});

  console.log(state);

  const setWordToBeGuessed = useCallback(() => {
    const randomWord = getRandomWord(dictionary.wordleDictionaryArray);
    dispatch({
      type: SET.WORD_TO_BE_GUESSED,
      payload: randomWord,
    });
  }, [dictionary]);

  useEffect(() => {
    const { wordleDictionarySet, wordleDictionaryArray } =
      getWordleDictionary();

    setDictionary({
      wordleDictionarySet,
      wordleDictionaryArray,
    });
  }, []);

  useEffect(() => {
    const localState = JSON.parse(localStorage.getItem(LS_WORDLE_STATE_KEY));
    dispatch({
      type: SET.INIT_LOCAL_STORAGE,
      payload: localState ?? initialState,
    });
  }, []);

  useEffect(() => {
    if (!state.wordToBeGuessed && state.isRestored) {
      setWordToBeGuessed();
    }
  }, [state.isRestored, state.wordToBeGuessed, setWordToBeGuessed]);

  const setGameOver = useCallback(isOver => {
    dispatch({
      type: SET.GAME_OVER,
      payload: isOver,
    });
  }, []);

  const resetGameState = useCallback(() => {
    setGameOver(false);
    dispatch({
      type: SET.RESET,
      payload: { ...initialState, guessDistribution: state.guessDistribution },
    });
    setWordToBeGuessed();
    localStorage.removeItem(LS_WORDLE_STATE_KEY);
  }, [setWordToBeGuessed, setGameOver, state]);

  const setCurrPos = useCallback(coords => {
    dispatch({
      type: SET.CURR_POS,
      payload: coords,
    });
  }, []);

  const setBoard = useCallback(board => {
    dispatch({
      type: SET.BOARD,
      payload: board,
    });
  }, []);

  const setTileState = useCallback(row => {
    dispatch({
      type: SET.TILE_STATE,
      payload: row,
    });
  }, []);

  const setKeyState = useCallback(keyState => {
    dispatch({
      type: SET.KEY_STATE,
      payload: keyState,
    });
  }, []);

  const setFinalStats = useCallback(guessDistribution => {
    dispatch({
      type: SET.FINAL_STATS,
      payload: guessDistribution,
    });
  }, []);

  return (
    <WordleContext.Provider
      value={{
        state,
        setCurrPos,
        setBoard,
        setTileState,
        setKeyState,
        setGameOver,
        dictionary,
        resetGameState,
        setFinalStats,
      }}
    >
      {children}
    </WordleContext.Provider>
  );
}
