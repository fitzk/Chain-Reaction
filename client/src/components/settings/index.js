import React, { Component } from 'react';
import Cube from '../cube';
import '../index.scss';

export default class PlayerUp extends Component {
  render() {
    return (
      <div>
        <div className="stats-container">
          <input
            id="botsonly"
            type="checkbox"
            value={this.props.botsOnly}
            onClick={() => this.props.setBotsOnly(!this.props.botsOnly)}
          />
          <label for="botsonly">Bot v Bot</label>
          <div className="row">
            <div className="col">
              <input
                type="radio"
                name="onebot"
                value={1}
                onClick={() => this.props.pickNumBots(1)}
                checked={this.props.numBots === 1}
              />{' '}
              1
            </div>
            <div className="col">
              <input
                type="radio"
                name="twobot"
                value={2}
                onClick={() => this.props.pickNumBots(2)}
                checked={this.props.numBots === 2}
              />{' '}
              2
            </div>
            <div className="col" />
          </div>
        </div>{' '}
      </div>
    );
  }
}
