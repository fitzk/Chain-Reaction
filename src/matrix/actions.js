import 'babel-polyfill';
export const ADD_CELL = 'ADD_CELL';
export const CRITICAL_MASS = 'CRITICAL_MASS';
export const CLICK_CELL = 'CLICK_CELL';
export const CLEAR_CELL = 'CLEAR_CELL';
export const RESET_BOARD = 'RESET_BOARD';
export const SET_PLAYER = 'SET_PLAYER';

export function _clickCell(clickedCell) {
  return {
    type: CLICK_CELL, clickedCell
  };
}
export const _badMove =()=>({type:'BAD_MOVE'});

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

export function clearCell(cells, index, cell) {
  return {
    type: CLEAR_CELL,
    cells,
    index,
    cell
  }
}

export function resetBoard(cells) {
  return {
    type: RESET_BOARD, cells
  }
}

const formatCells = (getState) => {
  if (!Array.isArray(getState().cells)) {
    return Object.keys(getState().cells).map(key => getState().cells[key]);
  }
  return getState().cells;
};

export const _setPlayer = (player) => ({type: SET_PLAYER, player});

export const play = () => (dispatch, getState) => {
  if(getState().clickedCell !== null) {
    dispatch(addCubeToCell());
    dispatch(endRound());
  }
};

export const clickCell = (index) => (dispatch, getState) =>{
  let currentPlayer = getState().players.current_player;
  let owner = getState().cells[index].owner;
  if(currentPlayer === owner) {
    dispatch(_clickCell(index));
  } else if (owner === null) {
    dispatch(_clickCell(index));
  } else {
    dispatch(_clickCell(null));
  }
};

export const getPlayerColor = (player) => {
  switch (player) {
    case 0:
    return 'green';
    case 1:
      return 'crimson';
    case 'green':
      return 0;
    case 'crimson':
      return 1;
    default:
      return 'green';
  }
};

export const endRound = () => (dispatch, getState) => {
  let current_player = getState().players.current_player;
  let next_player = 0;
  if (current_player === 0) {
    next_player = 1;
  }
  dispatch(_setPlayer(next_player));
};

export const addCubeToCell = () => (dispatch, getState) => {
  let player = getState().players.current_player;
  let cells = formatCells(getState);

  const color = getPlayerColor(player);
  const clicked_cell_index = getState().clickedCell.index;


    const old_cell = cells[clicked_cell_index];
    const new_cube = makeCube(old_cell, old_cell.mass.length, clicked_cell_index, color);

    let new_cell = makeCell(old_cell.critical_mass, [...old_cell.mass, new_cube], player);

    dispatch(_addCell(cells, clicked_cell_index, new_cell));
    dispatch(checkCriticalMass(clicked_cell_index));
    dispatch(resolveCriticalMass());


};

const resolveCriticalMass = () => (dispatch, getState) => {
  let critical_mass = getState().criticalMass;
  if (critical_mass.length > 0) {
    let index = critical_mass.pop();
    let old_cell = getState().cells[index];
    let clear_cell=makeCell(old_cell.critical_mass,[],null);
    dispatch(clearCell(getState().cells, index, clear_cell));
    let neighbors = getNeighbors(index);
    for (let neighbor of neighbors) {
      dispatch(attemptTakeOver(neighbor));
      dispatch(_clickCell(neighbor));
      dispatch(addCubeToCell());
    }
  }
  _updateCriticalMass([]);
};

const checkCriticalMass = (index) => (dispatch, getState) => {
  // check cell
  if (getState().cells[index].mass.length === getState().cells[index].critical_mass) {
    const currentMass = getState().criticalMass;
    let criticalMass = Object.assign([], currentMass, [...currentMass, index]);
    dispatch(_updateCriticalMass(criticalMass));
  }
};
export const makeCell = (critical_mass, mass, owner) => {
  return {
    critical_mass,
    mass,
    owner
  };
};
export const makeCube = (cell, cube_index, cell_index, color) => {
  if (cell) {
    return {
      index: cube_index,
      cell_index: cell_index,
      color: color,
    };

  }
};

export const attemptTakeOver = (index) => (dispatch, getState) => {
  let neighbor_cell = getState().cells[index];
  let current_player = getState().players.current_player;
  if (neighbor_cell.mass.length > 0 && neighbor_cell.owner !== current_player){
    let new_mass = [];
    for(let cube of neighbor_cell.mass) {
      let new_cube = makeCube(neighbor_cell, cube.index, cube.cell_index, getPlayerColor(current_player));
      new_mass.push(new_cube);
    }
    let old_cell = getState().cells[index];
    let clear_cell=makeCell(old_cell.critical_mass,[],null);
    dispatch(clearCell(getState().cells, index, clear_cell));
    let cell = makeCell(neighbor_cell.critical_mass, new_mass, current_player);
    dispatch(_addCell(getState().cells, index, cell));
  }
};

export function getNeighbors(cellIndex) {
  return [cellIndex - 1, cellIndex - 10, cellIndex + 1, cellIndex + 10];
}

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
          return makeCell(2,[],null);
        }
      }
      for (idx of [...top_row,
        ...left_col,
        ...right_col,
        ...bottom_row]) {
        if (index == idx) {
          return makeCell(3,[],null);
        }
      }
      return makeCell(4,[],null);
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
