import { connect } from 'react-redux';
import React, {Component, Proptypes} from 'react';
import Cell from '../components/cell';
import '../index.scss';
import mapStateToProps from '../selectors';
import {mapDispatchToProps} from '../actions';

class Matrix extends Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.generateBoard();
    }

    addCube(e){
        let cube = {
            index: e.target,
            cell_index: e.target.key,
            color: 'green',
        };
        console.log(e.target);
        this.props.addCubeToCell(cube);
    }

    render() {
        let renderedBoard = [];

        if(this.props.cells) {
            let cells = [...this.props.cells];
            renderedBoard = cells.map((cell) => {
                return <Cell onClick={this.addCube.bind(this)}
                             key={cell.index}
                             mass={cell.mass}
                             critical_mass={cell.critical_mass}
                />;
            });
        }
        return <div className="matrix">{renderedBoard}</div>;

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Matrix);