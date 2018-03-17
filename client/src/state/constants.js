export const DEFAULT_PLAYER_OPTIONS = [
  { id: 0, color: 'crimson', type: 'human' },
  { id: 1, color: 'green', type: 'bot' },
  { id: 2, color: 'yellow', type: 'bot' },
  { id: 3, color: 'grey', type: 'bot' }
];

export const DEFAULT_MATRIX = {
  top_row: [1, 2, 3, 4, 5, 6, 7, 8],
  left_col: [10, 20, 30, 40, 50, 60, 70, 80],
  right_col: [19, 29, 39, 49, 59, 69, 79, 89],
  bottom_row: [91, 92, 93, 94, 95, 96, 97, 98],
  corners: [0, 9, 90, 99]
};

export const DEFAULT_ROWS = 10;
export const DEFAULT_COLUMNS = 10;

export const DEFAULT_CUBE_COUNT = {
  crimson: 0,
  green: 0,
  yellow: 0,
  grey: 0
};
