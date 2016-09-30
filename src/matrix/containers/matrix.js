import { connect } from 'react-redux';
import React, {Component, PropTypes} from 'react';
import Cell from '../components/cell';
import '../index.scss';
import {mapDispatchToProps} from '../actions';
import _ from 'lodash';


export const mapStateToProps = state =>{
  return {
    cells: state.cells,
    adjacentCells: state.adjacentCells,
  }
};


class Matrix extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
      this.props.generateBoard();
      this.props.mapAdjacentCells();
    }
   componentWillReceiveProps(nextProps){
     if(_.isEmpty(this.props.cells)){
       this.props.generateBoard();
     }
    }
    shouldComponentUpdate(nextProps){
      if(this.props !== nextProps){
        return true;
      }
    }
    render() {
      let cells = this.props.cells;
      let renderedBoard = [];
       for ( var idx in cells) {
         let cell = cells[idx];
        renderedBoard.push(<Cell
           addCube={this.props.addCubeToCell.bind(this,cell)}
           key={idx}
           mass={cell.mass}
           critical_mass={cell.critical_mass}/>);
       }
      return <div className="matrix">{renderedBoard}</div>;

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Matrix);
