import {Record} from 'immutable';
import 'babel-polyfill';
export const ADD_CELL = 'ADD_CELL';
export const GET_CUBE = 'GET_CUBE';
export const CRITICAL_MASS = 'CRITICAL_MASS';
export const CLICK_CELL = 'CLICK_CELL';
export const UNCLICK_CELL = 'UNCLICK_CELL';
export const CLEAR_CELL = 'CLEAR_CELL';
export const RESET_BOARD = 'RESET_BOARD';
export const UPDATE_CELL = 'UPDATE_CELL';
export const UPDATE_CELLS = 'UPDATE_CELLS';
export const SET_ADJACENT_CELLS = 'SET_ADJACENT_CELLS';

export const SET_PLAYER = 'SET_PLAYER';



const Cube = new Record({
  index: undefined,
  cell_index: undefined,
  color: undefined,
});

export function clickCell(clickedCell) {
  return {
    type: CLICK_CELL, clickedCell
  };
}

export function unclickCell() {
  let clickedCell = -1;
  return {
    type: CLICK_CELL, clickedCell
  };
}

export function _addCell(cells, index, cell) {
  return {
    type: ADD_CELL, cells, index, cell
  };
}

export function _updateCriticalMass(criticalMass) {
  return {
    type: CRITICAL_MASS, criticalMass
  }
}

export function clearCell(cells,index) {
  return {
    type: CLEAR_CELL,
    cells,
    index
  }
}

export function resetBoard(cells) {
  return {
    type: RESET_BOARD, cells
  }
}

export function setAdjacentCells(adjacentCells) {
  return {
    type: SET_ADJACENT_CELLS, adjacentCells,
  }
}


const formatCells = (getState) => {
  if (!Array.isArray(getState().cells)) {
    return Object.keys(getState().cells).map(key => getState().cells[key]);
  }
  return getState().cells;
};

export const _setPlayer = (player) => ({ type: SET_PLAYER, player });

export const play = () => (dispatch, getState) => {
  let current_player = getState().players.current_player;
  dispatch(addCubeToCell(current_player));
  dispatch(endRound());

};

export const getPlayerColor = (player) => {
  switch(player){
    case 0: return 'green';
    case 1: return  'yellow';
    default: return 'pink';
  }
};

export const endRound = () => (dispatch, getState) => {
  let current_player = getState().players.current_player;
  let next_player = 0;
  if(current_player === 0) {
    next_player=1;
  }
  dispatch(_setPlayer(next_player));
};

export const addCubeToCell = () => (dispatch, getState) => {
  let player = getState().players.current_player;
  let cells = formatCells(getState);
  const color = getPlayerColor(player);
  const cell_index = getState().clickedCell.index;
  const old_cell = cells[cell_index];
  const cube = makeCube(old_cell, cell_index, color);
  let updated_cell = Object.assign({}, old_cell,
    { critical_mass: old_cell.critical_mass,
      mass: [...old_cell.mass, cube]
    });
  dispatch(_addCell(cells, cell_index, updated_cell));
  dispatch(checkCriticalMass(cell_index));
  dispatch(resolveCriticalMass());
};

const resolveCriticalMass = () => (dispatch, getState) => {
  let critical_mass = getState().criticalMass;
  console.log('critical mass:', critical_mass);
  if(critical_mass.length > 0) {
      let index = critical_mass.pop();

      dispatch(clearCell(getState().cells, index));
      let neighbors = getNeighbors(index);
      console.log(neighbors);
      for (let neighbor of neighbors) {
        console.log(neighbor);
        dispatch(clickCell(neighbor));
        dispatch(addCubeToCell());
      }
    }
  _updateCriticalMass([]);
};

const checkCriticalMass = (index) => (dispatch, getState) => {
  // check cell
  console.log(getState().cells[index]);
  if(getState().cells[index].mass.length === getState().cells[index].critical_mass){
    const currentMass = getState().criticalMass;
    let criticalMass = Object.assign([],currentMass,[...currentMass,index]);
    dispatch(_updateCriticalMass(criticalMass));
  }
};

const _updateCell = (cell) => ({ type: UPDATE_CELL });
const _updateCells = (cells) => ({ type: UPDATE_CELLS, cells });

const updateCell = (cell) => (dispatch, getState) => {
  const cells = formatCells(getState);
  const index = cells.indexOf(cell);
  const updatedCell = Object.assign({}, cells[index], cell);
  dispatch(_updateCell(index));
  const updatedCells = Object.assign([], cells, updatedCell);
  dispatch(_updateCells(updatedCells));
};

export function getNeighbors(cellIndex) {
  return [cellIndex-1,cellIndex - 10, cellIndex + 1, cellIndex + 10];
}

export const makeCube = (cell, index, color) => {
  if (cell) {
    return {
      index: cell.mass.length,
      cell_index: index,
      color: color,
    };

  }
};

export const makeCell = (critical_mass, mass) => {
    return {
      critical_mass,
      mass
    };
};


export const generateBoard = () => {
  return (dispatch, getState) => {
    const indexes = Array.from(Array(100).keys());
    const top_row = [1, 2, 3, 4, 5, 6, 7, 8];
    const left_col = [10, 20, 30, 40, 50, 60, 70, 80];
    const right_col = [19, 29, 39, 49, 59, 69, 79, 89];
    const bottom_row = [91, 92, 93, 94, 95, 96, 97, 98];
    const corners = [0, 9, 90, 99];

    const cells = indexes.map(index => {
      for (var idx of [...corners]) {
        if (index == idx) {
          return {critical_mass: 2, mass: []};
        }
      }
      for (idx of [...top_row,
        ...left_col,
        ...right_col,
        ...bottom_row]) {
        if (index == idx) {
          return {critical_mass: 3, mass: []};
        }
      }
      return {critical_mass: 4, mass: []};
    });

    dispatch(resetBoard(cells));
  }
};


export const mapDispatchToProps = {
  generateBoard,
  play,
  clickCell,
  _setPlayer,
};
