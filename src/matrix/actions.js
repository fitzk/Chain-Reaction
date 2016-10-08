import {Record} from 'immutable';
import 'babel-polyfill';
export const ADD_CUBE = 'ADD_CUBE';
export const GET_CUBE = 'GET_CUBE';
export const CRITICAL_MASS = 'CRITICAL_MASS';
export const CLICK_CELL = 'CLICK_CELL';
export const CLEAR_CELL = 'CLEAR_CELL';
export const RESET_BOARD = 'RESET_BOARD';
export const SET_ADJACENT_CELLS = 'SET_ADJACENT_CELLS';


const Cube = new Record({
  index: undefined,
  cell_index: undefined,
  color: undefined,
});

export function clickCell(index) {

  return {
    type: CLICK_CELL, index
  };

}
export function addCube(cells, cube) {

    return {
      type: ADD_CUBE, cells, cube
    };

}

export function hitCriticalMass(boolean) {
    return { type: CRITICAL_MASS,
        boolean }
}

export function clearCell(index) {
    return {
        type: CLEAR_CELL,
        index
    }
}

export function resetBoard(cells) {
  return {
    type: RESET_BOARD,
    cells
  }
}

export function setAdjacentCells(adjacentCells) {
  return {
    type: SET_ADJACENT_CELLS,
    adjacentCells,
  }
}


export function addCubeToCell(cell) {
  return (dispatch, getState) => {

    const cells = Object.keys(getState().cells).map(key => getState().cells[key]);
    let player_color = 'green';
    let queue = [];
    queue.unshift(cell);
    do {
      let _cell = queue.shift();
      const cube = makeCube(_cell, cells.indexOf(_cell), player_color );
      if(_cell.mass.length + 1 < _cell.critical_mass){
        dispatch(addCube(cells, cube));
      } else {
        dispatch(addCube(cells, cube));
        dispatch(clearCell(cells.indexOf(_cell)));
        let neighbors = getNeighbors(cells,cells.indexOf(_cell));
        queue.unshift(...neighbors);
      }
    } while (queue.length > 0);
  }
};

export function getNeighbors(cells, cellIndex){
  return [
    cells[cellIndex -1 ],
    cells[cellIndex - 10],
    cells[cellIndex + 1],
    cells[cellIndex + 10],
  ];
}

export const makeCube = (cell, index, color) => {
  if(cell){
      return {
        index: cell.mass.length,
        cell_index: index,
        color: color,
      };

  }
};

export const mapAdjacentCells = () => {
  return(dispatch, getState) => {
    const indexes = Array.from(Array(100).keys());
    let adjacentCells = [];
    //   for (var index of indexes) {
    //     console.log(index);
    //     let neighbors = [];
    //     if (index - 1 > -1) {
    //       neighbors.push(index - 1);
    //     }
    //     if (index + 1 < 100) {
    //       neighbors.push(index + 1);
    //     }
    //     if (index - 10 > -1) {
    //       neighbors.push(index - 10);
    //     }
    //     if (index + 10 < 100) {
    //       neighbors.push(index + 10);
    //     }
    //     adjacentCells.push(neighbors);
    //   }
    //   dispatch(mapAdjacentCells(adjacentCells));
    // }
  }
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
    addCubeToCell,
    mapAdjacentCells,
    clickCell,
};
