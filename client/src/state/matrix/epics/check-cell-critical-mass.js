import t from '../actions/types';
import { explodeCell } from '../actions/creators';

const checkCellCriticalMassEpic = (action$, { getState }) =>
  action$.ofType(t.CHECK_CELL_CRITICAL_MASS).mergeMap(({ payload }) => {
    const { matrix } = getState();

    const cell = { ...matrix.cells.byId[payload.selectedCell] };

    if (cell.mass.length === cell.critical_mass) {
      return [explodeCell(payload.selectedCell)];
    }

    return [{ type: t.CELL_NOT_AT_CRITICAL_MASS }];
  });

export default checkCellCriticalMassEpic;
