import { types as t } from './actions';

export const settings = (
  state = {
    numBots: 1,
    maxBots: 4,
    botsOnly: false
  },
  action
) => {
  switch (action.type) {
    case t.UPDATE_SETTINGS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default settings;
