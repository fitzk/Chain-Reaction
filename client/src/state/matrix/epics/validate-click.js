import t from '../actions/types';
import pt from 'src/state/players/actions/types';
import action from 'src/state/action';
import { badMove, storeSelectedCell } from '../actions/creators';

const clickValid = (current, cells, selectedCell) => {
  const owner = cells[selectedCell].owner;
  return current === owner || owner === null;
};

const validateClickEpic = (action$, { getState }) =>
  action$
    .ofType(t.PLAYER_CLICKED_CELL, t.BOT_CLICKED_CELL, t.SELECT_CELL)
    .mergeMap(({ payload }) => {
      const { players, matrix } = getState();

      const ok = clickValid(
        players.current,
        matrix.cells.byId,
        payload.selectedCell
      );

      return ok
        ? [
            action('matrix/STARTING_CASCADE', { inprogress: true, ...payload }),
            storeSelectedCell(payload.selectedCell),
            action('matrix/FINISHED_CASCADE', {
              inprogress: false,
              ...payload
            }),
            action(pt.GET_NEXT_PLAYER)
          ]
        : [badMove()];
    });

export default validateClickEpic;
