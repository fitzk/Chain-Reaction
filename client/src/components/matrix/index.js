import React, { Component } from 'react';
import _ from 'lodash';
import Cell from '../cell';
import '../index.scss';

class Matrix extends Component {
  componentDidMount() {
    this.props.createMatrix();
  }

  render() {
    return (
      <div className="matrix">
        {this.props.cells
          ? this.props.cells.map(cell => (
              <Cell
                clickCell={this.props.clickCell}
                index={cell.id}
                key={cell.id}
                mass={cell.mass}
                cell={cell}
                critical_mass={cell.critical_mass}
              />
            ))
          : null}
      </div>
    );
  }
}

export default Matrix;
