import React, { Component } from 'react';
import './Grid.css';
import GridSection from './GridSection.js';
import CONSTANTS from './Constants.js';
import {Line} from 'react-lineto';

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
            },

            x:0,y:0,xSet:0,ySet:0,cardWidth:0,cardHeight:0,margin:4,
        };
        this.addToList = this.addToList.bind(this);
        this.clickOnCard = this.clickOnCard.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);

    }

    onMouseMove(e){
        var bounds = e.target.getBoundingClientRect();
        var offsetX = e.clientX - bounds.left;
        var offsetY = e.clientY - bounds.top;
        var width = bounds.right - bounds.left;
        var height =  bounds.bottom - bounds.top;
        this.setState({ x: e.screenX, y: e.screenY, xSet:offsetX,ySet:offsetY,cardWidth:width,cardHeight:height});
    }


    clickOnCard(){
        console.log(this.state.x +" "+this.state.y + " "+this.state.xSet +" "+this.state.ySet + 
                    " " + this.state.cardHeight + " " + this.state.cardWidth);
        // the mouse on the margin
        if(this.state.xSet< this.state.margin || this.state.xSet > this.state.cardWidth - this.state.margin || 
           this.state.ySet < this.state.margin || this.state.ySet > this.state.cardHeight- this.state.margin){
          this.clickOnMargin();
        }else{
          this.clickOncard();
        }
    }

    clickOnMargin(){
        console.log("On the margin");
    }
    
    clickOncard(){
        console.log("On the card");
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

    render() {
        return (
        <div className="Grid">
            {this.sections.map((sectionTitle, i) =>
                <GridSection 
                    key={sectionTitle}
                    sectionTitle={sectionTitle} 
                    cardClickFunction={this.clickOnCard}
                    onMouseMoveFunction={this.onMouseMove}
                    cards={this.state.cards[sectionTitle]} 
                    addToList= {() => this.addToList(sectionTitle)}
                />
            )}
        <Line x0={0} y0={0} x1={100} y1={100} borderColor={"#00f"} />
        </div>
    
        );
    }
}

export default Grid;
