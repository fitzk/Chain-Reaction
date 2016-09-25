import React, {Component, Proptypes} from 'react';
import Cell from './cell';
import '../index.scss';

export const populateCells = () => {
    const indexes = Array.from(Array(100).keys());

    const top_row = [1,2,3,4,5,6,7,8];
    const left_col = [10,20,30,40,50,60,70,80];
    const right_col = [19,29,39,49,59,69,79,89];
    const bottom_row = [91,92,93,94,95,96,97,98];
    const corners = [0,9,90,99];

    const cells = indexes.map(index => {
        for (var idx of [...corners]){
            if(index==idx) {
                return {'index': index, "critical_mass": 2, mass: []};
            }
        }
        for (idx of [...top_row,
            ...left_col,
            ...right_col,
            ...bottom_row]){
            if(index==idx) {
                return {index: index, critical_mass: 3, mass: [{index: 0, color:'coral'},
                    {index: 1, color:'coral'}]};
            }
        }
        return {index: index, critical_mass: 4, mass: [{index: 0, color:'green'},
            {index: 1, color:'green'}, {index: 2, color:'green'}]};
    });

    return cells;
};

const GameBoard = props => {
    const cells = populateCells();
    const renderedBoard = cells.map((cell) =>
        <Cell key={cell.index}
              mass={cell.mass}/>);
    return <div className="game-board">{renderedBoard}</div>
};

export default GameBoard;
