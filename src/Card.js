import React, { Component } from 'react';
import './Card.css';
import {RIETextArea} from 'riek'
import firebase from './firebase/FirebaseConfig';
import ReactDom from 'react-dom';
import Popup from 'reactjs-popup';
import Modal from 'react-modal';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    
  }
};
class Card extends Component {
  constructor(props){
    super(props);
    this.state = {
      textarea : `Loading...`,
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
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
  cardClick(){
    this.setState({modalIsOpen: true});
  }
  render() {
    return (
    <div className="Card" onClick={this.openModal}>
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
         <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          overlayClassName="Overlay"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>
      </div>

    );
  }
}

export default Card;

