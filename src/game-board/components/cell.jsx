import React, {Component, Proptypes} from 'react';
import Player from './player';

const Cell = props => {
 //   const players = props.players.map(player => <Player/>);
    return <div className="cell">{props.children}</div>;
};

export default Cell;
