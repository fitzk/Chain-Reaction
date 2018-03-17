import t from '../actions/types';
import { updateCells } from '../actions/creators';

import * as c from 'src/state/constants';

const createMatrixEpic = action$ =>
  action$.ofType(t.CREATE_MATRIX).mergeMap(() => {
    const m = c.DEFAULT_MATRIX;
    const n = c.DEFAULT_ROWS * c.DEFAULT_COLUMNS;
    const cells = {
      allIds: [],
      byId: {}
    };
    cells.allIds = Array.from(Array(n).keys());

    // no corners
    const edges = [
      ...m.top_row,
      ...m.left_col,
      ...m.right_col,
      ...m.bottom_row
    ];

    for (let id of cells.allIds) {
      if (m.corners.includes(id)) {
        cells.byId[id] = empty(id, 2);
      }
      cells.byId[id] = edges.includes(id) ? empty(id, 3) : empty(id, 4);
    }

    // update cells in store
    return [updateCells(cells)];
  });

export default createMatrixEpic;

// helper methods
const empty = (id, critical_mass) => ({
  id,
  critical_mass,
  mass: [],
  owner: null
});
