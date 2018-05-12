import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
  render() {
    return (
      <div className="Card">
        {this.props.cardId}
      </div>
    );
  }
}

export default Card;
