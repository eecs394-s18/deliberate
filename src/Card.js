import React, { Component } from 'react';
import './Card.css';
import {RIETextArea} from 'riek'
import firebase from './firebase/FirebaseConfig';

class Card extends Component {
  constructor(props){
    super(props);
    this.state = {
      textarea : `Loading...`
    };
  }

  componentWillMount() {
    this.getCardNameFromDB();
  }

  getCardNameFromDB() {
    var cardNamePath = "/cards/" + this.props.cardId + "/name/";
    let thisCardNameRef = firebase.database().ref(cardNamePath);
    thisCardNameRef.on('value', (snapshot) => {
      this.setState({textarea: snapshot.val()})
    });
  }

  virtualServerCallback = (newState) => {
    this.changeState(newState);
  };

  changeState = (newState) => {
    this.setState(newState);
    var cardNamePath = "/cards/" + this.props.cardId + "/name/";
    firebase.database().ref().child(cardNamePath).set(newState.textarea);
    return
  };

  isStringAcceptable = (string) => {
    return (string.length >= 1);  // Minimum 4 letters long
  };

  validateAndUpdateDB(){   
      this.isStringAcceptable(this.state.textarea);
  }

  render() {
    return (
      <div className="Card">
        <div className = {this.props.cardId}>
            <img
              className="linkDestButton"
              src={require('./icons/plusNoBackground.svg')}
              onClick={this.props.drawLink}
              alt="Link Dest Button"/>
            <img
              className="deleteButton"
              src={require('./icons/iconmonstr-x-mark.svg')}
              onClick={this.props.deletefromList}
              alt="Delete Button"/>
            <div>
            <RIETextArea
              value={this.state.textarea}
              change={this.virtualServerCallback}
              propName="textarea"
              validate={this.validateAndUpdateDB()}
              classLoading="loading"
              classInvalid="invalid"/>
            </div>
            <img
              className="linkOriginButton"
              src={require('./icons/plusNoBackground.svg')}
              onClick={this.props.drawLink}
              alt="Link Origin Button"/>
         </div>
      </div>

    );
  }
}

export default Card;
