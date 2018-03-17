import t from './types';
import { getPlayerColor, switchPlayers } from '../../players/actions/creators';
import action from 'src/state/action';

export function playerClickedCell(selectedCell) {
  return {
    type: t.PLAYER_CLICKED_CELL,
    payload: {
      selectedCell
    }
  };
}

export function botClickedCell(selectedCell) {
  return {
    type: t.BOT_CLICKED_CELL,
    payload: {
      selectedCell
    }
  };
}

export const storeSelectedCell = selectedCell => ({
  type: t.STORE_SELECTED_CELL,
  payload: { selectedCell }
});

export const clearCell = selectedCell => ({
  type: t.CLEAR_CELL,
  payload: { selectedCell }
});

export const explodeCell = selectedCell => ({
  type: t.EXPLODE_CELL,
  payload: { selectedCell }
});

export const takeOverCell = selectedCell => ({
  type: t.TAKE_OVER_CELL,
  payload: { selectedCell }
});

export const createMatrix = () => ({
  type: t.CREATE_MATRIX
});

export const resetCubeCount = cubeCount => ({
  type: t.RESET_CUBE_COUNT,
  payload: { cubeCount }
});

export const checkCellCriticalMass = selectedCell => ({
  type: t.CHECK_CELL_CRITICAL_MASS,
  payload: { selectedCell }
});

export const badMove = () => ({ type: t.BAD_MOVE });

export const updateCells = (cells, caller) =>
  action(t.UPDATE_CELLS, { cells }, caller);

export const updateCell = (cell, caller) =>
  action(t.UPDATE_CELL, { cell }, caller);

export function resetBoard(cells) {
  return {
    type: t.RESET_STATE,
    cells
  };
}
