import t from './actions/types';
import * as c from '../constants';

const initPlayers = ({
  current = 0,
  isBot = false,
  numPlayers = 2,
  botsOnly = false,
  all = c.DEFAULT_PLAYER_OPTIONS
} = {}) => ({
  current,
  isBot,
  numPlayers,
  all
});

export const players = (state = initPlayers(), action) => {
  switch (action.type) {
    case t.BOTS_ONLY:
    case t.SET_CURRENT_PLAYER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default players;
