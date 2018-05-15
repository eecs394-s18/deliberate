import React, { Component } from 'react';
import './GridSection.css';
import CONSTANTS from './Constants.js'
import Card from './Card.js'


class GridSection extends Component {
    
    render() {

        return (
        <div className="GridSection" style={{backgroundColor:CONSTANTS.sectionColors[this.props.sectionTitle]}}>
            <div className="sectionTitle">{this.props.sectionTitle}</div>
            <div className="cardsSection">
                {this.props.cards.map((cardId, i) =>
                    <Card cardId={cardId} mouseFunction={this.props.onMouseMoveFunction} cardOnClick={this.props.cardClickFunction} key={cardId}/>
                )}
            </div>
            <img 
                className="plusButton" 
                src={require('./icons/plusButton.svg')}
                onClick={this.props.addToList}
                alt="Plus button"
            />
        </div>
        );
    }
}

export default GridSection;
