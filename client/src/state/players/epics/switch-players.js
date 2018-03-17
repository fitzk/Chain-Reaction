import t from '../actions/types';
import * as a from '../actions/creators';

const switchPlayersEpic = (action$, { getState }) =>
  action$.ofType(t.GET_NEXT_PLAYER).mergeMap(() => {
    const game = getState().game;
    const players = getState().players;
    const nextPlayer = (players.current + 1) % players.numPlayers;
    const setPlayerType =
      players.all[nextPlayer].type === 'bot' ? a.playerIsBot : a.playerIsHuman;
    if (game.winner) {
      return [{ type: 'gameover' }];
    }
    return [a.updateCurrentPlayer(nextPlayer), setPlayerType()];
  });

export default switchPlayersEpic;
