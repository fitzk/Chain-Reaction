import { combineReducers } from 'redux';
import {
  RESET_BOARD,
  ADD_CELL,
  CLEAR_CELL,
  SET_ADJACENT_CELLS,
  CLICK_CELL,
  UNCLICK_CELL,
  UPDATE_CELLS,
  CRITICAL_MASS,
  UPDATE_CELL,
  SET_PLAYER,
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

export const clickedCell = (state={}, action) => {
  switch (action.type) {
    case CLICK_CELL || UNCLICK_CELL:
      let clickedCell = action.clickedCell;
      return Object.assign({}, state, {index: clickedCell});
  default:
  return state;
  }
};

export const criticalMass = (state=[], action) => {
  switch (action.type) {
    case CRITICAL_MASS:
      return Object.assign([], state, action.criticalMass);
    default:
      return state;
  }
};

export const players = ( state={ current_player:0, total_players:2 }, action) => {
  switch(action.type) {
    case SET_PLAYER:
      return Object.assign({}, state, {current_player:action.player});
    default:
      return state;
  }
};

export const cells = (state=[], action) => {
    switch(action.type) {
      case UPDATE_CELLS:
        return Object.assign([], state, action.cells);
      case ADD_CELL:
        return Object.assign([], state, action.cells[action.index] = action.cell);
      case CLEAR_CELL:
        console.log(action);
        return Object.assign([], state,
          action.cells.map((cell, index)=> {
            if (index === action.index) {
              console.log(cell, index);
              return Object.assign({}, cell, {
                critical_mass: action.cells[action.index].critical_mass,
                mass: []
              });
            } else {
              return Object.assign({}, cell, action.cells[action.cells.indexOf(cell)]);
            }
          }),
        );
      case RESET_BOARD:
            return Object.assign([], state,  [...action.cells]);
      default:
            return state;
    }
};




const rootReducer = combineReducers({
  cells,
  clickedCell,
  criticalMass,
  players,
});

export default rootReducer;
