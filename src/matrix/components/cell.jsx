import React, {Proptypes} from 'react';
import Cube from './cube';

const Cell = props => {
  let cubes;
  if(props.mass) {
    try {
      cubes = props.mass.map(
        cube => <Cube key={cube.index}
                      className={`${cube.color} cube`}
        />);
    } catch (e) {
      console.log(e);
    }
    }
  let onClickWrapper = (e) => {
    try {
      props.clickCell(props.index);
      props.play();
    }catch (e){
      console.log(e);
    }
  };
  return <div onClick={onClickWrapper}
              className="cell"> {cubes} </div>;

};

export default Cell;
