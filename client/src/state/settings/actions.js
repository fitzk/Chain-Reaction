export const types = {
  UPDATE_SETTINGS: 'settings/UPDATE_SETTINGS'
};

export const setBotsOnly = botsOnly => ({
  type: types.UPDATE_SETTINGS,
  payload: {
    botsOnly
  }
});

export const pickNumBots = numBots => ({
  type: types.UPDATE_SETTINGS,
  payload: {
    numBots
  }
});
