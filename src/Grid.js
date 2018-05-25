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
        let linkPath = 'links/';
        let linksRef = dbRef.ref(linkPath);

        linksRef.on('value', (snapshot) => {
            let tlinks = this.state.links;
            var origin, dest;
            var linkTuple;

            Object.keys(snapshot.val()).forEach(l => {
                var linkId = 'links/' + l;
                var linksIdRef = dbRef.ref(linkId);
                linksIdRef.on('value', (snapshot) => {
                    Object.keys(snapshot.val()).forEach(l => {
                        var valPath = linkId + '/' + l;
                        if (l === "origin"){
                            console.log(valPath);
                            var originRef = dbRef.ref(valPath);
                            originRef.on('value', (snapshot) => {
                                origin = snapshot.val();
                                console.log(origin);
                            });
                        }
                        else if (l === "dest"){
                            console.log(valPath);
                            var destRef = dbRef.ref(valPath);
                            destRef.on('value', (snapshot) => {
                                dest = snapshot.val();
                                console.log(dest);
                            });
                        }
                        else{
                        }
                        console.log(l);
                        });
                    });
                linkTuple = [origin, dest];
                console.log(linkTuple);
                tlinks.push(linkTuple);
            });
            this.setState({links:tlinks});
            // console.log(this.state.links);
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
        const dbRef = firebase.database();
        this.listenToCardsForMeetingFromDB(dbRef);
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
          var linkTuple = this.linkTuple;
          var id = linkTuple[0] + linkTuple[1];
          var schema = {"origin":linkTuple[0], "dest": linkTuple[1], "status": "positive"};
          
          // schema[id] = {}
          // schema[id]["origin"] = linkTuple[0];
          // schema[id]["dest"] = linkTuple[1];
          // schema[id]["status"] = "positive";
          tLinks.push(linkTuple);
          console.log(linkTuple);
          var pathToLink = "/links/" + id;
          firebase.database().ref().child(pathToLink).set(schema);

          this.setState({
              links: tLinks,
          });
          this.linkTuple =[];
      }
      return
    }

    deletefromList(sectionId, cardId) {
        var pathToMeeting = "/meetings/" + this.state.meetingId + "/" + sectionId + "/" + cardId; 
        var pathToCard = "/cards/" + cardId;
        firebase.database().ref().child(pathToMeeting).remove();
        firebase.database().ref().child(pathToCard).remove();
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
            {this.state.links.map((t) =>
                <LineTo from={t[0]} to={t[1]} />
            )};
        </div>
        );
    }
}

export default Grid;
