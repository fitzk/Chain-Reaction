import React from 'react';
import Cube from './cube';

const Cell = props => (
  <div
    onClick={() => props.clickCell(props.index)}
    className="animated zoomInUp cell"
  >
    {props.mass
      ? props.mass.map(cube => (
          <Cube
            key={cube.index + props.cell.id}
            className={`${cube.color} cube`}
          />
        ))
      : null}
  </div>
);

export default Cell;
