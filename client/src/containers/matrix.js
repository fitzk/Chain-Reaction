import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { mapDispatchToProps } from 'state/matrix/actions';
import Matrix from '../components/matrix';

export const mapStateToProps = state => {
  return {
    cells: state.cells,
    clickedCell: state.clickedCell,
    criticalMass: state.criticalMass
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Matrix);
