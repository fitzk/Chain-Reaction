import { types as t } from '../actions';

export const gameStateEpic = action$ =>
  action$.ofType(t.START_GAME).mergeMap(() => {
    return [{ type: 'click', value: action$.index }];
  });
