import t from '../actions/types';
import { updateCell, takeOverCell } from '../actions/creators';
import * as c from 'src/state/constants';

const explodeCellEpic = (action$, { getState }) =>
  action$.ofType(t.EXPLODE_CELL).mergeMap(({ payload }) => {
    const cells = getState().matrix.cells;
    const cell = { ...cells.byId[payload.selectedCell] };

    // reset mass and owner

    const neighbors = getNeighbors(payload.selectedCell);
    const actions = [];

    // explode into neighbor cells
    for (let neighbor of neighbors) {
      actions.push(takeOverCell(neighbor));
    }

    return [
      updateCell(
        {
          id: cell.id,
          critical_mass: cell.critical_mass,
          mass: [],
          owner: null
        },
        'explodeCellEpic'
      ),
      ...actions
    ];
  });

export default explodeCellEpic;

export const getNeighbors = selectedCell => {
  const matrix = c.DEFAULT_MATRIX;

  if (matrix.top_row.includes(selectedCell)) {
    return [selectedCell - 1, selectedCell + 10, selectedCell + 1];
  }

  if (matrix.bottom_row.includes(selectedCell)) {
    return [selectedCell - 1, selectedCell - 10, selectedCell + 1];
  }

  if (matrix.left_col.includes(selectedCell)) {
    return [selectedCell - 10, selectedCell + 1, selectedCell + 10];
  }
  // x === 0
  // x === n - 1
  // if y === 0
  // if y === n - 1
  // from row 0 take column 0 and n-1

  if (matrix.right_col.includes(selectedCell)) {
    return [selectedCell - 10, selectedCell - 1, selectedCell + 10];
  }

  if (selectedCell === 0) return [10, 1];
  if (selectedCell === 9) return [8, 19];
  if (selectedCell === 90) return [80, 91];
  if (selectedCell === 99) return [98, 89];

  return [
    selectedCell - 1,
    selectedCell - 10,
    selectedCell + 1,
    selectedCell + 10
  ];
};
