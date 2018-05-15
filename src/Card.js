import React, { Component } from 'react';
import './Card.css';
/**
 * @param x: The x-coordinate on this page 
 * @param y: The y-coordinate on this page 
 * @param xSet : The offset on X from right -> left on each card
 * @param ySet : The offset on Y from right -> left on each card
 */
class Card extends Component {
  static isClicked = false;
  constructor(props){
    super(props);
  }

  
  
  render() {
    return (
      <div className="cardBorder"  onClick={this.props.cardOnClick} 
        onMouseMove={this.props.mouseFunction}> 
        <div className="Card" >{this.props.cardId}</div>
      </div>
    );
  }
}

export default Card;
