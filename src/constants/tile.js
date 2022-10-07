const TILE_STATUS = {
  MISS: 'miss',
  ALMOST: 'almost',
  EXACT: 'exact',
};

const {MISS, ALMOST, EXACT} = TILE_STATUS;

const TILE_COLOR = {
  [EXACT]: 'bg-green-50 dark:bg-green-100',
  [ALMOST]: 'bg-yellow-50 dark:bg-yellow-100',
  [MISS]: 'bg-gray-50 dark:bg-black-10',
};

const TILE_BORDER_COLOR = {
  [EXACT]: 'border-green-50 dark:border-green-100',
  [ALMOST]: 'border-yellow-50 dark:border-yellow-100',
  [MISS]: 'border-gray-50 dark:border-black-10',
};

export {TILE_STATUS, TILE_COLOR, TILE_BORDER_COLOR};
