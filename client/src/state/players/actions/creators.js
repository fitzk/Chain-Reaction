import action from 'src/state/action';
import t from './types';

export const nextPlayer = () => ({ type: t.GET_NEXT_PLAYER });
export const updateCurrentPlayer = current =>
  action(t.SET_CURRENT_PLAYER, { current });
export const playerIsBot = () => action(t.PLAYER_IS_BOT, { isBot: true });
export const playerIsHuman = () => action(t.PLAYER_IS_HUMAN, { isBot: false });
