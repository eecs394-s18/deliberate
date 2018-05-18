import React, { Component } from 'react';
import './Card.css';
import {RIETextArea} from 'riek'

class Card extends Component {
  constructor(props){
    super(props);
    this.state = {
      textarea : `Multiline example
  text value`
    };
  }

  virtualServerCallback = (newState) => {
    this.changeState(newState);
  };

  changeState = (newState) => {
    this.setState(newState);
  };

  isStringAcceptable = (string) => {
    return (string.length >= 1);  // Minimum 4 letters long
  };

  render() {
    return (
      <div className="Card">
        <div className = {this.props.cardId}>
            <img
              className="linkDestButton"
              src={require('./icons/plusNoBackground.svg')}
<<<<<<< HEAD
              onClick={this.props.drawLinkDest}
              alt="Link Dest Button"/>
            <img 
              className="deleteButton" 
=======
              onClick={this.props.drawLink}
              alt="Link Dest Button"/>
            <img
              className="deleteButton"
>>>>>>> e4a4a5e93af47ccbf02ff6fd4be4f6996d127eb7
              src={require('./icons/iconmonstr-x-mark.svg')}
              onClick={this.props.deletefromList}
              alt="Delete Button"/>
            {this.props.cardId}
            <div>
            <RIETextArea
            value={this.state.textarea}
            change={this.virtualServerCallback}
            propName="textarea"
            validate={this.isStringAcceptable}
            classLoading="loading"
            classInvalid="invalid"/>
            </div>
            <img
              className="linkOriginButton"
              src={require('./icons/plusNoBackground.svg')}
<<<<<<< HEAD
              onClick={this.props.drawLinkOrigin}
              alt="Link Origin Button"/>
=======
              onClick={this.props.drawLink}
              alt="Link Origin Button"/>
         </div>
>>>>>>> e4a4a5e93af47ccbf02ff6fd4be4f6996d127eb7
      </div>

    );
  }
}

export default Card;
