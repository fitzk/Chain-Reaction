import React, {Component, Proptypes} from 'react';
import Cell from './cell';
import '../index.scss';

const GameBoard = props => {
    const indexes = Array.from(Array(100).keys());

    const top_row = [1,2,3,4,5,6,7,8];
    const left_col = [10,20,30,40,50,60,70,80];
    const right_col = [19,29,39,49,59,69,79,89];
    const bottom_row = [91,92,93,94,95,96,97,98];
    const corners = [0,9,90,99];

    const cells = indexes.map(index => {
        for (var idx of [...corners]){
            if(index==idx) {
                return {'index': index, 'mass': 2};
            }
        }
        for (idx of [...top_row,
                ...left_col,
                ...right_col,
                ...bottom_row]){
            if(index==idx) {
                return {'index': index, 'mass': 3};
            }
        }
        return {'index': index, 'mass': 4};
    });
    const renderBoard = cells.map((cell) =>
        <Cell key={cell.index}><div className="content">{cell.mass}</div></Cell>);
    return <div className="game-board">{renderBoard}</div>
};

export default GameBoard;
