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
      myVote: 0,
      posVotings: [],
      negVotings: [],
      nPosVotes: 0,
      nNegVotes: 0
    };
    this.name = 'mockName';
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.clickThumpup = this.clickThumpup.bind(this);
    this.clickThumpdown = this.clickThumpdown.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
  }
  handleOpenModal() {
    this.setState({showModal: true});
    // fetch votedata from database.
  }
  afterOpenModal(){
    this.checkNameAndUpdate(this.name);
  }
  checkNameAndUpdate(voterName){
    if(this.state.posVotings.includes(voterName)){
      this.setState({isThumb:1});
      document.getElementById("Thumbupid").style.color = "green";
    } else if(this.state.negVotings.includes(voterName)){
      this.setState({isThumb:-1});
      document.getElementById("Thumbdownid").style.color = "red";
    } else{
      this.setState({isThumb:0});
    }
  }

  handleCloseModal() {
    this.setState({showModal: false});
  }

  componentWillMount() {
    this.getCardNameFromDB();
    this.getVotingFromDb();
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
      if (snapshot.val()) {
        this.setState({detailarea: snapshot.val()});
      }
    });
  }

  getVotingFromDb() {
      if (this.props.cardId === 'default') { // default is a placeholder card that shouldn't be displayed
        console.error("default card shouldn't be displayed")
      }
      var negPath = "/cards/" + this.props.cardId + "/negativeVotes/";
      var posPath = "/cards/" + this.props.cardId + "/positiveVotes/";

      let thisCardPosRef = firebase.database().ref(posPath);
      thisCardPosRef.on('value', (snapshot) => {
          if (snapshot.val()) {
            var pArray = this.loopThrough(snapshot.val());
            this.setState({posVotings: pArray});
            this.setState({nPosVotes: Object.keys(snapshot.val()).length});
          } else {
            this.setState({posVotings: []});
            this.setState({nPosVotes: 0});
          }
      });

      let thisCardNegRef = firebase.database().ref(negPath);
      thisCardNegRef.on('value', (snapshot) => {
          if (snapshot.val()) {
            var nArray = this.loopThrough(snapshot.val());
            this.setState({negVotings: nArray});
            this.setState({nNegVotes: Object.keys(snapshot.val()).length});
          } else {
            this.setState({negVotings: []});
            this.setState({nNegVotes: 0});
          }
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

  deleteVote(voterName, voteType) {
    if (voteType === 'up') {
      // remove the positive vote
      let votePath = "/cards/" + this.props.cardId + "/positiveVotes/" + this.name;
      firebase.database().ref().child(votePath).remove();
    } else if (voteType === 'down') {
      // remove the negative vote
      let votePath = "/cards/" + this.props.cardId + "/negativeVotes/" + this.name;
      firebase.database().ref().child(votePath).remove();
    } else {
      console.error('invalid vote type');
    }
  }

  addVote(voteType) {
    if (voteType==='up') {
      // remove negative vote
      this.deleteVote(this.name, 'down');
      // add positive vote
      let votePath = "/cards/" + this.props.cardId + "/positiveVotes/" + this.name;
      firebase.database().ref().child(votePath).set(true);
    }
    else if (voteType==='down') {
      // remove positive vote
      this.deleteVote(this.name, 'up');
      // add negative vote
      let votePath = "/cards/" + this.props.cardId + "/negativeVotes/" + this.name;
      firebase.database().ref().child(votePath).set(true);
    } else {
      console.error('invalid vote type');
    }
  }

  clickThumpup(){
    // use setState doesn't work. So change state directly
    var number = this.state.myVote;
    if(this.state.isThumb === 1) {
      this.setState({isThumb: 0});
      number -=1;
      document.getElementById("Thumbupid").style.color = "black";
      this.deleteVote(this.name, 'up');
    }else if(this.state.isThumb === 0){
      this.setState({isThumb: 1});
      number +=1;
      document.getElementById("Thumbupid").style.color = "green";
      this.addVote('up')
    }else{
      this.setState({isThumb: 1});
      number+=2
      document.getElementById("Thumbupid").style.color = "green";
      document.getElementById("Thumbdownid").style.color = "black";
      this.addVote('up')
    }
    this.setState({myVote:number});
    this.getVotingFromDb();
  }

  clickThumpdown(){
    var number = this.state.myVote;
    if(this.state.isThumb === -1) {
      this.setState({isThumb: 0});
      number +=1;
      document.getElementById("Thumbdownid").style.color = "black";
      this.deleteVote(this.name, 'down');
    }else if(this.state.isThumb === 0){
      this.setState({isThumb: -1});
      number -=1;
      document.getElementById("Thumbdownid").style.color = "red";
      this.addVote('down')
    }else{
      this.setState({isThumb: -1});
      number -=2
      document.getElementById("Thumbdownid").style.color = "red";
      document.getElementById("Thumbupid").style.color = "black";
      this.addVote('down')
    }
    this.setState({myVote:number});
    this.getVotingFromDb();
  }

  // helper function

  loopThrough(dict){
    var array = []
    for (var key in dict){
      array.push(key);
    }
    return array
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
              onAfterOpen = {this.afterOpenModal}
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
                  <div className="upVoters">
                  {this.state.posVotings.map(function(item, i){
                    return <li>{item}</li>
                  })} 
                  </div> 
                  <FaThumbsDown id= "Thumbdownid" className="Thumbdown" onClick={this.clickThumpdown}/>
                  <div className="downVoters">
                  {this.state.negVotings.map(function(item, i){
                    return <li>{item}</li>
                  })} 
                  </div> 
                  <div className="voteNumber">{this.state.nPosVotes - this.state.nNegVotes}</div>
                </div>
           </ReactModal>
         </div>
      </div>

    );
  }
}

export default Card;
