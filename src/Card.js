import React, { Component } from 'react';
import './Card.css';
import {RIETextArea} from 'riek'
import firebase from './firebase/FirebaseConfig';
import ReactModal from 'react-modal';
import {FaThumbsUp, FaThumbsDown,FaFileTextO,FaAlignJustify} from 'react-icons/lib/fa'

class Card extends Component {
  constructor(props){
    super(props);
    this.state = {
      textarea : `Loading...`,
      showModal: false,
      detailarea : `Put some detail information`,
      isThumb: 0,
      thumbN: 0,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.clickThumpup = this.clickThumpup.bind(this);
    this.clickThumpdown = this.clickThumpdown.bind(this);
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
    var cardDetailPath = "/cards/" + this.props.cardId + "/detail/";
    let thisCardDetailRef = firebase.database().ref(cardDetailPath);
    thisCardDetailRef.on('value', (snapshot) => {
      this.setState({detailarea: snapshot.val()})
    });
  }

  virtualServerCallbackName = (newState) => {
    this.changeStateName(newState);
  };

  virtualServerCallbackDetail = (newState) => {
    this.changeStateDetail(newState);
  };

  changeStateDetail = (newState) => {
    this.setState(newState);
    var cardNamePath = "/cards/" + this.props.cardId + "/detail/";
    firebase.database().ref().child(cardNamePath).set(newState.detailarea);
    return
  };

  changeStateName = (newState) => {
    this.setState(newState);
    var cardNamePath = "/cards/" + this.props.cardId + "/name/";
    firebase.database().ref().child(cardNamePath).set(newState.textarea);
    return
  };

  detailServerCallback = (newState) =>{
    //this.setState({this.stat});
    var cardNamePath = "/cards/" + this.props.cardId + "/name/";
    firebase.database().ref().child(cardNamePath).set(newState.textarea);
    return
  }

  isStringAcceptable = (string) => {
    return (string.length >= 1);  // Minimum 4 letters long
  };

  validate(){
      this.isStringAcceptable(this.state.textarea);
  }

  clickThumpup(){
    // use setState doesn't work. So change state directly
    var number = this.state.thumbN;
    if(this.state.isThumb === 1) {
      this.setState({isThumb: 0});
      number -=1;
      document.getElementById("Thumbupid").style.color = "black";
    }else if(this.state.isThumb === 0){
      this.setState({isThumb: 1});
      number +=1;
      document.getElementById("Thumbupid").style.color = "green";
    }else{
      this.setState({isThumb: 1});
      number+=2
      document.getElementById("Thumbupid").style.color = "green";
      document.getElementById("Thumbdownid").style.color = "black";
    }
    // this.thumbRender();
    this.setState({thumbN:number});
    
    console.log(this.state.isThumb);
    console.log(this.state.thumbN);
  }

  clickThumpdown(){
    var number = this.state.thumbN;
    if(this.state.isThumb === -1) {
      this.setState({isThumb: 0});
      number +=1;
      document.getElementById("Thumbdownid").style.color = "black";
    }else if(this.state.isThumb === 0){
      this.setState({isThumb: -1});
      number -=1;
      document.getElementById("Thumbdownid").style.color = "red";
    }else{
      this.setState({isThumb: -1});
      number -=2
      document.getElementById("Thumbdownid").style.color = "red";
      document.getElementById("Thumbupid").style.color = "black";
    }
    this.setState({thumbN:number});
    console.log(this.state.isThumb);
    console.log(this.state.thumbN);
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
           <div>
             
           </div>
           <div className="CardText" onClick={this.handleOpenModal}>{this.state.textarea}</div>
           <ReactModal
              isOpen={this.state.showModal}
              contentLabel="Minimal Modal Example"
              className="Modal"
              shouldCloseOnOverlayClick={false}
              overlayClassName="Overlay">
              <div className="top">
                <div className="topcontainer">
                  <p className="subpageheader"> Detail Page</p>
                  <p className="closebtn"  onClick={this.handleCloseModal}> Close</p>
                </div> 
              </div>
              <div className="mainBox">
                <div className="cardName">
                  <div className="icons"> 
                    <FaFileTextO className="icons"/>
                  </div>
                  
                  <RIETextArea
                    className="cardTitle"
                    value={this.state.textarea}
                    change={this.virtualServerCallbackName}
                    propName="textarea"
                    validate={this.validate()}
                    classLoading="loading"
                    classInvalid="invalid"/>
                  </div>

                  <div className="icons2"> 
                    <FaAlignJustify className="icons"/>
                  </div>
                  
                  <RIETextArea
                    className="cardDetail"
                    value={this.state.detailarea}
                    change={this.virtualServerCallbackDetail}
                    propName="detailarea"
                    validate={this.validate()}
                    classLoading="loading"
                    classInvalid="invalid"/>
                  <FaThumbsUp id= "Thumbupid" className="Thumbup" onClick={this.clickThumpup} />
                  <FaThumbsDown id= "Thumbdownid" className="Thumbdown" onClick={this.clickThumpdown}/>
                  <div class ="voteNumber">{this.state.thumbN}</div>
                </div>
           </ReactModal>
         </div>
      </div>

    );
  }
}

export default Card;
