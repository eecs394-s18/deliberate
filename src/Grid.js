import React, { Component } from 'react';
import './Grid.css';
import GridSection from './GridSection.js';
import CONSTANTS from './Constants.js';

class Grid extends Component {
    sections = ["Values", "Goals", "Problems", "Solutions"];
    constructor(props) {
        super(props);
        this.state = {
            cards: {
                "Values": ["V1", "V2"],
                "Goals": ["G1"],
                "Problems": ["P1", "P2", "P3"],
                "Solutions": ["S1", "S2"]
            }
        };
        this.addToList = this.addToList.bind(this)
        this.deletefromList = this.deletefromList.bind(this)
    }

    addToList(sectionId) {
        var tCards = this.state.cards;
        var newCardIndex = tCards[sectionId].length+1;
        var newCardId = CONSTANTS.sectionPrefix[sectionId] + newCardIndex;
        tCards[sectionId].push(newCardId);
        this.setState({
            cards: tCards,
        });
    }

    deletefromList(sectionId, cardId) {
        var tCards = this.state.cards;
        tCards[sectionId].splice( tCards[sectionId].indexOf(cardId), 1 );
        this.setState({
            cards: tCards,
        });
    }

    render() {
        return (
        <div className="Grid">
            {this.sections.map((sectionTitle, i) =>
                <GridSection 
                    key={sectionTitle}
                    sectionTitle={sectionTitle} 
                    cards={this.state.cards[sectionTitle]} 
                    addToList= {() => this.addToList(sectionTitle)}
                    deletefromList= {this.deletefromList}
                />
            )}
        </div>
        );
    }
}

export default Grid;
