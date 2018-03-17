import React, { Component } from 'react';
import Game from 'src/components/game';
import Stats from 'src/containers/stats';
import Matrix from 'src/containers/matrix';
import PlayerUp from '../components/settings';

export default class GamePage extends Component {
  render() {
    return (
      <Game>
        <Matrix />
        <Stats />
      </Game>
    );
  }
}
