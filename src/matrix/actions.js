import {Record} from 'immutable';
export const ADD_CUBE = 'ADD_CUBE';
export const GET_CUBE = 'GET_CUBE';
export const CRITICAL_MASS = 'CRITICAL_MASS';
export const CLEAR_CELL = 'CLEAR_CELL';
export const RESET_BOARD = 'RESET_BOARD';
export const SET_ADJACENT_CELLS = 'SET_ADJACENT_CELLS';


const Cube = new Record({
  index: undefined,
  cell_index: undefined,
  color: undefined,
});

export function addCube(cells, cube) {

    return {type: ADD_CUBE, cells, cube};

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
export function helper(cube, cell, cells) {
  addCubeToCell(cells[cell.index-1])();
  addCubeToCell(cells[cell.index+1])();
};

export function  addCubeToCell (cell) {

  return (dispatch, getState) => {
    const cells =  Object.keys( getState().cells).map(key =>  getState().cells[key]);
    console.log();

    const cube = makeCube(cell, cells.indexOf(cell), 'green');
    if (cell.mass.length + 1 < cell.critical_mass) {
    return dispatch(addCube(cells, cube));
    } else {
      const cells = getState().cells.cells;
    //  return helper(cube, cell, cells);
    }
  }
}



// export const addCubeToCell = (cell) => {
//   return (dispatch, getState) => {
//     const cube = makeCube(cell, 'green');
//     if (!checkCell(cell)) {
//       dispatch(addCube(cube));
//     } else {
//       const cells = getState().cells.cells;
//       let stillChecking = true;
//       while (stillChecking) {
//         console.log('CHECKING AGAIN');
//         for (var celly of cells) {
//           if (checkCell(celly)) {
//             dispatch(clearCell(celly.index));
//             if(cells.indexOf(celly) > 0) {
//               const leftCell = cells[cells.indexOf(celly) - 1];
//                 dispatch(addCube(makeCube(leftCell, 'green')));
//             }
//             if(cells.indexOf(celly) < 99){
//               dispatch(addCube(makeCube(cells[cells.indexOf(celly) + 1], 'green')));
//             }
//             if(cells.indexOf(celly) > 9) {
//               dispatch(addCube(makeCube(cells[cells.indexOf(celly) - 10], 'green')));
//             }
//             if(cells.indexOf(celly) < 90) {
//               dispatch(addCube(makeCube(cells[cells.indexOf(celly) + 10], 'green')));
//             }
//           }
//           if (cells.indexOf(celly) === cells.length-1) {
//             stillChecking = false;
//           }
//         }
//       }
//     }
//   }
// };



export const checkCell=(cell)=>{
  if (cell.mass.length + 1 === cell.critical_mass){
    return true;
  }
  return false;
};

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
    for (var index of indexes) {
      console.log(index);
      let neighbors = [];
      if (index - 1 > -1) {
        neighbors.push(index - 1);
      }
      if (index + 1 < 100) {
        neighbors.push(index + 1);
      }
      if (index - 10 > -1) {
        neighbors.push(index - 10);
      }
      if (index + 10 < 100) {
        neighbors.push(index + 10);
      }
      adjacentCells.push(neighbors);
    }
    dispatch(setAdjacentCells(adjacentCells));
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
};
