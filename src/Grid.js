import React, { Component } from 'react';
import './Grid.css';
import GridSection from './GridSection.js';
import CONSTANTS from './Constants.js';
import firebase from './firebase/FirebaseConfig';

class Grid extends Component {
    sections = ["Values", "Goals", "Problems", "Solutions"];
    constructor(props) {
        super(props);
        this.state = {
            cards: {
                "Values": [],
                "Goals": [],
                "Problems": [],
                "Solutions": []
            }
        };
        this.addToList = this.addToList.bind(this)
        this.deletefromList = this.deletefromList.bind(this)
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
        tCards[sectionId].push(newCardId);
        this.setState({
            cards: tCards,
        });
    }



    drawLink(cardId) {
      alert(cardId);



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
            )}
        </div>
        );
    }
}

export default Grid;
