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
            <img
              className="linkOriginButton" 
              src={require('./icons/plusNoBackground.svg')}
              onClick={this.props.drawLink}
              alt="Link Origin Button"
            />
      </div>

    );
  }
}

export default Card;
