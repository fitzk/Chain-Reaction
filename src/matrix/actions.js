
export const ADD_CUBE = 'ADD_CUBE';
export const GET_CUBE = 'GET_CUBE';
export const CRITICAL_MASS = 'CRITICAL_MASS';
export const CLEAR_CELL = 'CLEAR_CELL';
export const RESET_BOARD = 'RESET_BOARD';


export function addCube(cube) {
    return { type: ADD_CUBE, cube }
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
        cells,
    }
}


export const addCubeToCell = (cell) => {

       const cells = state.cells.cells;
      //console.log(cell.mass.length, ' === ', cell.critical_mass, ' = ', cell.mass.length === cell.critical_mass);
      if (cell.mass.length === cell.critical_mass) {
        let left = cell.index-1;
        //left = left.index - 1;
        const right = cell;
        const rightCell = right.index - 1;
        addCubeToCell(cells[42]);
      }

      let cube = {
        index: cell.mass.length,
        cell_index: cell.index,
        color: 'green',
      };
     dispatch(addCube(cube)).then({
       console.log('Added to cell: ', getState().cells.cells[cell.index]);
     });
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
                    return {index: index, critical_mass: 2, mass: []};
                }
            }
            for (idx of [...top_row,
                ...left_col,
                ...right_col,
                ...bottom_row]) {
                if (index == idx) {
                    return {index: index, critical_mass: 3, mass: []};
                }
            }
            return {index: index, critical_mass: 4, mass: []};
        });

        dispatch(resetBoard(cells));
    }
};

export const mapDispatchToProps={
    generateBoard,
    addCubeToCell,
};
