import React, {Proptypes} from 'react';
import Cube from './cube';

const Cell = props => {
   const cubes = props.mass.map(cube => <Cube key={cube.index}
                                              className={`${cube.color} cube`}/>);
    return <div onClick={props.onClick} className="cell"> {cubes} </div>;
};

export default Cell;
