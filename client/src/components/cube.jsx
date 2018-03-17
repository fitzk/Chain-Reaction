import React, {Proptypes} from 'react';
import Transition from 'react-motion-ui-pack'

const Cube = props => {
  return (
      <div className={'animated rubberBand ' + props.className}>
        {props.children}
      </div>
  );
};

export default Cube;
