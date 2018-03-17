import { updateCell, storeSelectedCell } from '../actions/creators';
import t from '../actions/types';

const takeOverCellEpic = (action$, { getState }) =>
  action$.ofType(t.TAKE_OVER_CELL).mergeMap(({ payload }) => {
    const { matrix, players } = getState();

    // cell is neighbors with the cell that hit
    // critical mass
    const cell = { ...matrix.cells.byId[payload.selectedCell] };
    const current = players.current;
    const updatedMass = [];

    for (let cube of cell.mass) {
      updatedMass.push({
        index: cube.index,
        cell_index: cube.cell_index,
        color: players.all[current].color
      });
    }

    return [
      updateCell(
        {
          id: cell.id,
          critical_mass: cell.critical_mass,
          mass: updatedMass,
          owner: current
        },
        'takeOverCellEpic'
      ),
      // triggers add cube which adds one cube and finishes the explosion
      // process or triggers another cascade
      storeSelectedCell(payload.selectedCell)
    ];
  });

export default takeOverCellEpic;
