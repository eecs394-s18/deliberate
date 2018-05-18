import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
  render() {
    return (
      <div className="Card">
        <div className = {this.props.cardId}>
            <img
              className="linkDestButton"
              src={require('./icons/plusNoBackground.svg')}
              onClick={this.props.drawLink}
              alt="Link Dest Button"
            />
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
      </div>

    );
  }
}

export default Card;
