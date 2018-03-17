export const types = {
  SET_WINNER: 'game/SET_WINNER',
  LOG_WINNER: 'game/LOG_WINNER',
  START_GAME: 'game/START_GAME',
  END_GAME: 'game/END_GAME',
  CLEAR_WINNER: 'game/CLEAR_WINNER'
};

export const winner = player => ({
  type: types.LOG_WINNER,
  payload: {
    player
  }
});

export const clearWinner = player => ({
  type: types.CLEAR_WINNER,
  payload: {
    winner: false
  }
});

export const startGame = () => ({
  type: types.START_GAME,
  payload: {
    active: true
  }
});
