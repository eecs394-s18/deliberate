import React, { Component } from 'react';
import './GridSection.css';
import SECTIONCOLORS from './Constants.js'

class GridSection extends Component {
  render() {
    return (
      <div className="GridSection" style={{backgroundColor:SECTIONCOLORS[this.props.sectionTitle]}}>
        <div className="sectionTitle">{this.props.sectionTitle}</div>
      </div>
    );
  }
}

export default GridSection;
