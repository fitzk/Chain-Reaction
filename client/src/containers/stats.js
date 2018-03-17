import React from 'react';
import { connect } from 'react-redux';
import Stats from '../components/stats';
import { clearWinner } from '../state/game/actions';

export const mapDispatchToProps = {
  clearWinner
  // setBotsOnly
};

export const mapStateToProps = state => {
  return {
    winner: state.game.winner,
    loading: state.matrix.inprogress,
    stats: {
      current: state.players.all[state.players.current].color,
      players: [
        { color: 'crimson', count: state.matrix.cubes.crimson },
        { color: 'green', count: state.matrix.cubes.green }
        // { color: 'yellow', count: state.matrix.cubes.yellow },
        // { color: 'grey', count: state.matrix.cubes.grey }
      ]
    },
    ...state.settings
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
