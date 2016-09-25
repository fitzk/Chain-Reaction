import React, {PropTypes} from 'react';


const Root = props => {

    return (
        <div className="root">
        {React.cloneElement({...props}.children, {...props})}
        </div>);

};

export default Root;