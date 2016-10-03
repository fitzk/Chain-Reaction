import { combineReducers } from 'redux';
import {
  RESET_BOARD,
  ADD_CUBE,
  CLEAR_CELL,
  SET_ADJACENT_CELLS,
} from './actions.js';

export const adjacentCells = (state={}, action) => {
  switch(action.type) {
    case SET_ADJACENT_CELLS:
      console.log(action);
      return Object.assign({}, state, action.adjacentCells );
    default:
      return state;
  }
};

export const cells = (state={}, action) => {
    switch(action.type) {
      case ADD_CUBE:
            return Object.assign({}, state, action.cells.map((cell, index)=> {
                if (index === action.cube.cell_index) {
                  return Object.assign({}, cell, {
                    mass: [...cell.mass, action.cube]
                  });
                }
                return cell;
              }),
            );
      case CLEAR_CELL:
        return Object.assign({}, state,
          state.cells.map((cell, index)=> {
            if (index === action.index) {
              return Object.assign({}, cell, {
                mass: []
              });
            }
            return cell;
          }),
        );
      case RESET_BOARD:
            return Object.assign({}, state,  action.cells);
      default:
            return state;
    }
};



const rootReducer = combineReducers({
  adjacentCells,
  cells,
});

export default rootReducer;
