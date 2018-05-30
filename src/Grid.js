import React, { Component } from 'react';
import './Grid.css';
import GridSection from './GridSection.js';
import CONSTANTS from './Constants.js';
import firebase from './firebase/FirebaseConfig';
import LineTo from 'react-lineto';

class Grid extends Component {
    sections = ["Values", "Goals", "Problems", "Solutions"];
    linkTuple = [];
    constructor(props) {
        super(props);
        this.state = {
            cards: {
                "Values": [],
                "Goals": [],
                "Problems": [],
                "Solutions": []
            },
            meetingId: "1",
            links: [],
            name: "vhcnf",
            votes: "hihta"
        };
        this.addToList = this.addToList.bind(this);
        this.deletefromList = this.deletefromList.bind(this);
        this.drawLink = this.drawLink.bind(this);
    }

    listenToCardsForMeetingFromDB(dbRef, meetingId) {
        CONSTANTS.sectionNames.forEach(sectionName => {
            let sectionRefString = 'meetings/'+meetingId+"/"+sectionName;
            let thisSectionRef = dbRef.ref(sectionRefString);

            thisSectionRef.on('value', (snapshot) => {
                let tCards = this.state.cards;
                if(snapshot.val()) {
                    let cardIds = Object.keys(snapshot.val());
                    // remove default
                    var index = cardIds.indexOf("default");
                    if (index > -1) {
                        cardIds.splice(index, 1);
                    }
                    // --------------
                    tCards[sectionName] = cardIds;
                }
                this.setState({ cards : tCards})
            });
        });
    }

    UpdateCardsForDB(sectionId, newCardId){
        var pathToMeeting = "/meetings/" + this.state.meetingId + "/" + sectionId + "/" + newCardId; 
        var pathToCard = "/cards/" + newCardId;
        var schema = {"links": {"incoming": "undefined", "outgoing": "undefined"}, "name":this.state.name, "votes": this.state.votes}
        firebase.database().ref().child(pathToMeeting).set("true");
        firebase.database().ref().child(pathToCard).set(schema);
        return
    }


    componentWillMount() {
        this.setState({meetingId: this.props.match.params.number});
        const dbRef = firebase.database();
        this.listenToCardsForMeetingFromDB(dbRef, this.props.match.params.number);
    }

    addToList(sectionId) {
        var tCards = this.state.cards;
        var max = 0;
        tCards[sectionId].forEach(element => {
            var thiscardindex = element.substring(3,);
            if (max < thiscardindex){
                max = thiscardindex;
            }
        });
        var newCardIndex = parseInt(max, 10)+1;
        var newCardId = "M" + this.state.meetingId + CONSTANTS.sectionPrefix[sectionId] + newCardIndex;
        this.UpdateCardsForDB(sectionId, newCardId);
    }


    drawLink(cardId) {
      this.linkTuple.push(cardId);
      if(this.linkTuple.length === 2){
          var tLinks = this.state.links;
          tLinks.push(this.linkTuple);
          this.setState({
              links: tLinks,
          });
          this.linkTuple =[];
      }
    }

    deletefromList(sectionId, cardId) {
        var pathToMeeting = "/meetings/" + this.state.meetingId + "/" + sectionId + "/" + cardId; 
        var pathToCard = "/cards/" + cardId;
        firebase.database().ref().child(pathToMeeting).remove();
        firebase.database().ref().child(pathToCard).remove();
        let tCards = this.state.cards;
        let index = tCards[sectionId].indexOf(cardId);
        if(index !== -1) tCards[sectionId].splice(index, 1);
        this.setState({ cards : tCards})
        return
    }

    render() {
        return (
        <div className="Grid">

            {this.sections.map((sectionTitle, i) =>
                <GridSection
                    key={sectionTitle}
                    sectionTitle={sectionTitle}
                    cards={this.state.cards[sectionTitle]}
                    addToList= {() => this.addToList(sectionTitle)}
                    deletefromList= {this.deletefromList}
                    drawLink = {this.drawLink}/>
            )};
            <div className = "Lines">
            {this.state.links.map((t) =>
                <LineTo from={t[0]} to={t[1]} />
                )};
            </div>
            
        </div>
        );
    }
}

export default Grid;
