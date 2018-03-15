import {combineReducers} from 'redux';
import {
  RESET_BOARD,
  ADD_CELL,
  CLEAR_CELL,
  CLICK_CELL,
  CRITICAL_MASS,
  SET_PLAYER
} from './actions.js';

export const clickedCell = (state = {}, action) => {
  switch (action.type) {
    case CLICK_CELL:
      let clickedCell = action.clickedCell;
      return Object.assign({}, state, {index: clickedCell});
    default:
      return state;
  }
};

export const criticalMass = (state = [], action) => {
  switch (action.type) {
    case CRITICAL_MASS:
      return Object.assign([], state, action.criticalMass);
    default:
      return state;
  }
};

export const players = (state = {
                          current_player: 0,
                          total_players: 2
                        },
                        action) => {
  switch (action.type) {
    case SET_PLAYER:
      return Object.assign({}, state, {current_player: action.player});
    default:
      return state;
  }
};

export const cells = (state = [], action) => {
  switch (action.type) {
    case ADD_CELL:
      return Object.assign(
        [],
        state,
        (action.cells[action.index] = action.cell)
      );
    case CLEAR_CELL:
      return Object.assign(
        [],
        state,
        (action.cells[action.index] = action.cell)
      );
    case RESET_BOARD:
      return Object.assign([], state, [...action.cells]);
    default:
      return state;
  }
};


const matrix = combineReducers({
  cells,
  clickedCell,
  criticalMass,
  players
});

export default matrix;
