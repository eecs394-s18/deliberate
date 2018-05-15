import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
  render() {
    return (
      <div className="Card">
            <img 
                className="deleteButton" 
                src={require('./icons/iconmonstr-x-mark.svg')}
                onClick={this.props.deletefromList}
                alt="Delete Button"
            />
            {this.props.cardId}
      </div>

    );
  }
}

export default Card;
