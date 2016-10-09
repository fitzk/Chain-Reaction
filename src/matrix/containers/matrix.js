import { connect } from 'react-redux';
import React, {Component, PropTypes} from 'react';
import Cell from '../components/cell';
import '../index.scss';
import {mapDispatchToProps} from '../actions';
import _ from 'lodash';


export const mapStateToProps = state =>{
  return {
    cells: state.cells,
    clickedCell: state.clickedCell,
    criticalMass: state.criticalMass,
  }
};

class Matrix extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
      this.props.generateBoard();
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
      if (cells) {
        for (let cell of cells) {
          renderedBoard.push(<Cell
            clickCell = {this.props.clickCell}
            play={this.props.play}
            index={cells.indexOf(cell)}
            key={cells.indexOf(cell)}
            mass={cell.mass}
            cell={cell}
            critical_mass={cell.critical_mass}/>);
        }
      }
      return (
        <div className="container">
          <div className="header">CHAIN REACTION</div>
         <div className="matrix">{renderedBoard}</div>
        </div>
      );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Matrix);
