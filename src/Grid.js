import React, { Component } from 'react';
import './Grid.css';
import GridSection from './GridSection.js'

class Grid extends Component {
  sections = ["Values", "Goals", "Problems", "Solutions"];

  render() {
    return (
      <div className="Grid">
        {this.sections.map((item, i) =>
            <GridSection sectionTitle={item}/>
        )}
      </div>
    );
  }
}

export default Grid;
