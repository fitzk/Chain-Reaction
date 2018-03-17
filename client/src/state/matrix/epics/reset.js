import action from 'src/state/action';
import * as c from 'src/state/constants';
import t from '../actions/types';
import { types as gt } from 'src/state/game/actions';

const resetEpic = (action$, { getState }) =>
  action$.ofType(t.RESET_STATE, gt.CLEAR_WINNER).mergeMap(() => {
    const cubes = { ...c.DEFAULT_CUBE_COUNT };
    return [action(t.CREATE_MATRIX), action(t.RESET_CUBE_COUNT, { cubes })];
  });

export default resetEpic;
