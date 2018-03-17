import t from './actions/types';
import * as c from 'src/state/constants';

const initMatrix = ({
  cells = {
    allIds: [],
    byId: {}
  },
  inprogress = false,
  selectedCell,
  cubes = c.DEFAULT_CUBE_COUNT
} = {}) => ({
  cells,
  selectedCell,
  cubes
});

const matrix = (state = initMatrix(), action) => {
  switch (action.type) {
    case 'matrix/STARTING_CASCADE':
    case 'matrix/FINISHED_CASCADE':
    case t.UPDATE_CELLS:
    case t.STORE_SELECTED_CELL:
    case t.COUNT_CUBES:
    case t.RESET_CUBE_COUNT:
      return {
        ...state,
        ...action.payload
      };
    case t.UPDATE_CELL:
      return {
        ...state,
        cells: {
          ...state.cells,
          byId: {
            ...state.cells.byId,
            [action.payload.cell.id]: action.payload.cell
          }
        }
      };
    default:
      return state;
  }
};

export default matrix;
