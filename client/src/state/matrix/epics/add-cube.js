import t from '../actions/types';
import * as a from '../actions/creators';

const addCubeEpic = (action$, { getState }) =>
  action$.ofType(t.STORE_SELECTED_CELL).mergeMap(({ payload }) => {
    const { players, matrix } = getState();

    const cell = { ...matrix.cells.byId[payload.selectedCell] };
    const color = players.all[players.current].color;

    // make new cube
    const cube = {
      index: cell.mass.length,
      cell_index: payload.selectedCell,
      color
    };

    // update cells in store
    return [
      a.updateCell({
        ...cell,
        owner: players.current,
        mass: [...cell.mass, cube]
      }),
      a.checkCellCriticalMass(payload.selectedCell)
    ];
  });

export default addCubeEpic;
