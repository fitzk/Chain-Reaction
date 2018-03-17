import React from 'react';
import { connect } from 'react-redux';
import Matrix from '../components/matrix';
import {
  createMatrix,
  playerClickedCell
} from '../state/matrix/actions/creators';

export const mapStateToProps = state => {
  return {
    cells: state.matrix.cells.allIds.map(id => state.matrix.cells.byId[id]),
    selectedCell: state.matrix.selectedCell
  };
};

export const mapDispatchToProps = {
  createMatrix,
  clickCell: playerClickedCell
};
export default connect(mapStateToProps, mapDispatchToProps)(Matrix);
