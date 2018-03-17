import React, { Component } from 'react';
import Cube from '../cube';
import './index.scss';

export default class Stats extends Component {
  render() {
    return (
      <div className="stats-container">
        <div className="stats">
          <Cube className={`${this.props.stats.current} cube big-cube`}>
            {this.props.winner ? (
              <div>WINNER!!</div>
            ) : this.props.stats.players[0].count === 0 ? (
              'Your Turn!'
            ) : (
              ''
            )}
          </Cube>
        </div>
        <div className="stats">
          {this.props.stats.players.map(player => (
            <Cube className={`${player.color} cube med-cube`}>
              <div className="count">{player.count}</div>
            </Cube>
          ))}
        </div>
        <div className="stats">
          {this.props.loading ? <p>loading...</p> : null}
        </div>

        <div className="stats">
          <button className="new-game-button" onClick={this.props.clearWinner}>
            NEW GAME
          </button>
        </div>
      </div>
    );
  }
}

Stats.defaultProps = {
  stats: {
    current: 'crimson',
    players: [{ color: 'crimson', count: 0 }, { color: 'green', count: 0 }]
  }
};
