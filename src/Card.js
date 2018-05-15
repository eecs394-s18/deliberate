import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
  
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
