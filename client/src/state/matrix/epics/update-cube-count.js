import t from '../actions/types';
import action from 'src/state/action';
import * as c from 'src/state/constants';
import { winner } from '../../game/actions';

const updateCubeCountEpic = (action$, { getState }) =>
  action$.ofType(t.CHECK_CELL_CRITICAL_MASS).mergeMap(() => {
    const cells = getState().matrix.cells;
    const cubes = { ...c.DEFAULT_CUBE_COUNT };

    cells.allIds.map(id => {
      const cell = cells.byId[id];
      if (cell.mass.length > 0) {
        for (let cube of cell.mass) {
          cubes[cube.color]++;
        }
      }
    });
    if (
      (cubes.crimson > 1 && cubes.green === 0) ||
      (cubes.green > 1 && cubes.crimson === 0)
    ) {
      return [
        action(t.COUNT_CUBES, { cubes }),
        winner(getState().players.current)
      ];
    }

    return [action(t.COUNT_CUBES, { cubes })];
  });

export default updateCubeCountEpic;
