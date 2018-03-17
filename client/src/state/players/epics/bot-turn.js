import t from '../actions/types';
import * as ma from '../../matrix/actions/creators';

const botTurnEpic = (action$, { getState }) =>
  action$
    .ofType(t.PLAYER_IS_BOT)
    .delay(800)
    .mergeMap(() => {
      const { matrix, players, game } = getState();
      const nextMove = getBotMove(
        matrix.cells,
        matrix.selectedCell,
        players.current
      );
      if (game.winner) {
        return [{ type: 'gameover' }];
      }
      return [ma.botClickedCell(nextMove)];
    });

export default botTurnEpic;

// helpers
const botCanClickCheckFactory = (cells, lastClicked, botId) => new_index =>
  new_index > 0 &&
  new_index < 99 &&
  new_index !== lastClicked &&
  cells[new_index] &&
  (cells[new_index].owner === null || cells[new_index].owner === botId);

const getBotMove = (cells, lastClicked, botId) => {
  const check = botCanClickCheckFactory(cells.byId, lastClicked, botId);

  for (let id of cells.allIds) {
    const cell = cells.byId[id];
    if (cell.owner === botId && cell.mass.length === cell.critical_mass - 1) {
      return id;
    }
  }

  let nextIndex = -1;

  do {
    nextIndex = Math.floor(Math.random() * 99);
  } while (!check(nextIndex));

  return nextIndex;
};
