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
<<<<<<< HEAD
            meetingId: "1",
            textarea : `Multiline example
  text value`
=======
            links: [],
>>>>>>> e4a4a5e93af47ccbf02ff6fd4be4f6996d127eb7
        };
        this.addToList = this.addToList.bind(this);
        this.deletefromList = this.deletefromList.bind(this);
        this.drawLink = this.drawLink.bind(this);
    }


    listenToCardsForMeetingFromDB(dbRef) {
        CONSTANTS.sectionNames.forEach(sectionName => {
            let sectionRefString = 'meetings/1/'+sectionName;
            let thisSectionRef = dbRef.ref(sectionRefString);

            thisSectionRef.on('value', (snapshot) => {
                let tCards = this.state.cards;
                tCards[sectionName] = Object.keys(snapshot.val());
                this.setState({ cards : tCards})
            });
        });
    }

    UpdateCardsForMeetingFromDB(sectionId, newCardId){
        var path = "/meetings/" + this.state.meetingId + "/" + sectionId + "/" + newCardId; 
        firebase.database().ref().child(path).set("true");
        // var Update = {};
        // console.log(sectionId, newCardId);
        // Update["/meetings/" + this.state.meetingId + "/" + sectionId + "/" + newCardId] = {"true"};
        // console.log(Update);
        return
    }

    componentWillMount() {
        const dbRef = firebase.database();
        this.listenToCardsForMeetingFromDB(dbRef);
    }

    addToList(sectionId) {
        var tCards = this.state.cards;
        var max = 0;
        tCards[sectionId].forEach(element => {
            var thiscardindex = element.substring(1,);
            if (max < thiscardindex){
                max = thiscardindex;
            }
        });
        var newCardIndex = parseInt(max, 10)+1;
        var newCardId = CONSTANTS.sectionPrefix[sectionId] + newCardIndex;
        this.UpdateCardsForMeetingFromDB(sectionId, newCardId);
        tCards[sectionId].push(newCardId);
        this.setState({
            cards: tCards,
        });
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
        var tCards = this.state.cards;
        tCards[sectionId].splice( tCards[sectionId].indexOf(cardId), 1 );
        this.setState({
            cards: tCards,
        });
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
                    drawLink = {this.drawLink}
                />
            )};
            {this.state.links.map((t) =>
                <LineTo from={t[0]} to={t[1]} />
            )};
        </div>
        );
    }
}

export default Grid;
