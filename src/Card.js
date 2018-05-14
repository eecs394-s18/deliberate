import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
  render() {
    return (
      <div className="Card">
        {this.props.cardId}
            <img 
                className="deleteButton" 
                src={require('./icons/iconmonstr-x-mark-4.svg')}
                onClick={this.props.deletefromList}
                alt="Delete Button"
            />
      </div>

    );
  }
}

export default Card;
