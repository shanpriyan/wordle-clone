import { SET, LS_WORDLE_STATE_KEY } from './actions';

function wordleReducer(state, action) {
  switch (action.type) {
    case SET.CURR_POS:
      return {
        ...state,
        currPos: { ...state.currPos, ...action.payload },
      };

    case SET.BOARD:
      return {
        ...state,
        board: action.payload,
      };

    case SET.WORD_TO_BE_GUESSED:
      return {
        ...state,
        wordToBeGuessed: action.payload,
      };

    case SET.TILE_STATE:
      return {
        ...state,
        tileState: action.payload,
      };

    case SET.GAME_OVER:
      return {
        ...state,
        isGameOver: action.payload,
      };

    case SET.KEY_STATE:
      return {
        ...state,
        keyState: action.payload,
      };
    case SET.GUESS_DISTRIBUTION:
      return {
        ...state,
        guessDistribution: action.payload,
      };

    case SET.INIT_LOCAL_STORAGE:
      return { ...action.payload, isRestored: true };

    case SET.RESET:
      return { ...action.payload };

    default:
      return state;
  }
}

export function reducer(...args) {
  const state = wordleReducer(...args);
  localStorage.setItem(LS_WORDLE_STATE_KEY, JSON.stringify(state));
  return state;
}
