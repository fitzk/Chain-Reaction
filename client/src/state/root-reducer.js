import { combineReducers } from 'redux';
import matrix from 'state/matrix/reducers';
import players from 'state/players/reducer';
import game from 'state/game/reducer';
import settings from 'state/settings/reducer';

export default combineReducers({
  players,
  matrix,
  game,
  settings
});
