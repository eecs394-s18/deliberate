import React, { Component } from 'react';
import './Card.css';
import {RIETextArea} from 'riek'
import firebase from './firebase/FirebaseConfig';
import ReactModal from 'react-modal';
import {FaThumbsUp, FaThumbsDown} from 'react-icons/lib/fa'


class Card extends Component {
  constructor(props){
    super(props);
    this.state = {
      textarea : `Loading...`,
      showModal: false
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  handleOpenModal() {
    this.setState({showModal: true});
  }

  handleCloseModal() {
    this.setState({showModal: false});
  }

  componentWillMount() {
    this.getCardNameFromDB();
    ReactModal.setAppElement('body');
  }

  getCardNameFromDB() {
    if (this.props.cardId === 'default') { // default is a placeholder card that shouldn't be displayed
      console.error("default card shouldn't be displayed")
    }
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

  validateAndUpdateDB(CardId){
       this.isStringAcceptable(this.state.textarea);
  }


  render() {
    return (
    <div className="Card" >
        <div className = {this.props.cardId} >

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
            <div className="CardText">
            </div>
            <img
              className="linkOriginButton"
              src={require('./icons/plusNoBackground.svg')}
              onClick={this.props.drawLink}
              alt="Link Origin Button"/>
         </div>
         <div>
           <div className="CardText" onClick={this.handleOpenModal}>{this.state.textarea}</div>
           <ReactModal
              isOpen={this.state.showModal}
              contentLabel="Minimal Modal Example"
              className="Modal"
              overlayClassName="Overlay">
              <br/>
              <br/>
               <RIETextArea
                className="detailTitle"
                value={this.state.textarea}
                change={this.virtualServerCallback}
                propName="textarea"
                validate={this.validateAndUpdateDB()}
                classLoading="loading"
                classInvalid="invalid"/>
                <br/>
                <br/>
                <FaThumbsUp/>
                <FaThumbsDown/>
                <br/>
             <button onClick={this.handleCloseModal}>Close card detail</button>
           </ReactModal>
         </div>
      </div>

    );
  }
}

export default Card;
