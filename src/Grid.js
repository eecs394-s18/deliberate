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
            name: "Click to enter text", //default card name
            votes: "hihta",
            passcodeEntered: false
        };
        this.addToList = this.addToList.bind(this);
        this.deletefromList = this.deletefromList.bind(this);
        this.drawLink = this.drawLink.bind(this);
        this.submit = this.submit.bind(this);
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
                let linkPath = 'links/';
                let linksRef = dbRef.ref(linkPath);

                linksRef.on('value', (snapshot) => {
                    var tlinks = [];
                    var origin, dest;
                    var linkTuple;
                    if(snapshot.val()){
                        Object.keys(snapshot.val()).forEach(l => {
                            if (l !== "linkschild"){
                                var linkId = 'links/' + l;
                                var linksIdRef = dbRef.ref(linkId);

                                linksIdRef.on('value', (snapshot) => {
                                    var schema = snapshot.val();
                                    if (schema != null) {
                                        origin = schema["origin"];
                                        dest = schema["dest"];
                                    }
                                    });
                                linkTuple = [origin, dest];
                                tlinks.push(linkTuple);
                            }
                            
                        });
                    }
                this.setState({links:tlinks});
            });
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
        console.log("passcode entered", this.state.passcodeEntered)
    }

    addToList(sectionId) {
        var tCards = this.state.cards;
        var max = 0;
        tCards[sectionId].forEach(element => {
            var thiscardindex = element.match(/\d+/g)[1];
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
            if (this.linkTuple[0] === this.linkTuple[1]){
                this.linkTuple =[];
                return
            }
            var tLinks = this.state.links;
            var linkTuple = this.linkTuple;
            var id = linkTuple[0] + linkTuple[1];
            var schema = {"origin":linkTuple[0], "dest": linkTuple[1], "status": "positive"};
            tLinks.push(linkTuple);
            var pathToLink = "/links/" + id;
            firebase.database().ref().child(pathToLink).set(schema);
            this.setState({
                links: tLinks,
            });
            this.linkTuple =[];
         }
        return
    }

    submit(e) {
        const dbRef = firebase.database();
        const queryString = "/meetings/" + this.props.match.params.number;

        dbRef.ref(queryString).once('value').then((snapshot) => {
            var newState = false;
            const test = snapshot.val();
            const memberPasscode = this.getMemberInputPassword();
            const adminPasscode = this.getAdminInputPassword();

            document.getElementById("admin").value = "";
            document.getElementById("member").value = "";

            var memberPasscodeHit = (test.memberPasscode === memberPasscode);
            var adminPasscodeHit = (test.adminPasscode === adminPasscode);

            if (memberPasscodeHit) {
                console.log("member");
                newState = true;
            } 

            if (adminPasscodeHit) {
                console.log("admin");
                newState = true;
            }

            this.setState({passcodeEntered: newState});
            var tlink = this.state.links;
            this.setState({links: tlink});

            if (newState === false) {
                alert('incorrect passcode!')
            }
            console.log("passcode entered", this.state.passcodeEntered)
        });

        
    }

    getMemberInputPassword(){
        const member = document.getElementById("member").value;
        return member;
    }

    getAdminInputPassword() {
        const admin = document.getElementById("admin").value;
        return admin;
    }

    deletefromList(sectionId, cardId) {
        this.state.links.forEach(e => {
            var pathtolink = 'links/' + e[0] + e[1];
            if(e[0] === cardId){
                firebase.database().ref().child(pathtolink).remove();
            } else if (e[1] === cardId){
                firebase.database().ref().child(pathtolink).remove();
            }
        });
        var pathToMeeting = "/meetings/" + this.state.meetingId + "/" + sectionId + "/" + cardId; 
        var pathToCard = "/cards/" + cardId;
        firebase.database().ref().child(pathToMeeting).remove();
        firebase.database().ref().child(pathToCard).remove();
        let tCards = this.state.cards;
        let index = tCards[sectionId].indexOf(cardId);
        if(index !== -1) tCards[sectionId].splice(index, 1);
        this.setState({ cards : tCards});
        return
    }

    render() {
        return (
            this.state.passcodeEntered ? (
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
                        <LineTo key={t[0]+t[1]} from={t[0]} to={t[1]} />
                    )}  
                </div>
            ) : (
            <div id="bkg">
                <h1> enter meeting passcode! </h1>
                <input type="text" id="admin" placeholder="Admin Password" />
                <input type="text" id="member" placeholder="Member Password" />
                <div id="btn" onClick={this.submit}> <div> submit </div> </div>
            </div>
            )
        );
    }
}

export default Grid;
