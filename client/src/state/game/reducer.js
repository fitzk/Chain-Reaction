import { types as t } from './actions';

export const game = (
  state = {
    round: 0,
    active: false,
    winner: false,
    wins: []
  },
  action
) => {
  switch (action.type) {
    case t.INIT_ROUND:
    case t.END_ROUND:
    case t.START_GAME:
    case t.CLEAR_WINNER:
      return { ...state, winner: false };
    case t.LOG_WINNER:
      return {
        ...state,
        wins: [...state.wins, action.player],
        winner: true
      };
    default:
      return state;
  }
};

export default game;
