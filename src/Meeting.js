import React, { Component } from 'react';
import styles from './Meeting.css';
import firebase from './firebase/FirebaseConfig';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class Meeting extends Component {
    constructor(props) {
        super(props);
        this.state = {
          meetingName: "",
          adminPasscode: "",
          memberPasscode: "",
          link: "",
          copied: false,
        };
        this.createMeetingForm = this.createMeetingForm.bind(this);
        this.handleMeetingNameChange = this.handleMeetingNameChange.bind(this);
        this.handleAdminPasscodeChange = this.handleAdminPasscodeChange.bind(this);
        this.handleMemberPasscodeChange = this.handleMemberPasscodeChange.bind(this);
    }

    createMeetingForm(e) {
      const dbRef = firebase.database();
      var numMeetingsRef = dbRef.ref("/meetings/numMeetings");
      numMeetingsRef.once('value', (snapshot) => {
        var newMeetingNum = snapshot.val() + 1;
        console.log(newMeetingNum)
        var pathToNewMeeting = "/meetings/" + newMeetingNum;
        var emptyMeetingBlob = { "Goals" : { "default" : "placeholder" },
            "Problems" : { "default" : "placeholder" }, "Solutions" : { "default" : "placeholder" },
            "Values" : { "default" : "placeholder" }, "links" : { "default" : "placeholder" },
            "name" : this.state.meetingName, "adminPasscode" : this.state.adminPasscode,
            "memberPasscode" : this.state.memberPasscode };
        firebase.database().ref().child(pathToNewMeeting).set(emptyMeetingBlob);
        numMeetingsRef.set(newMeetingNum);

        var hostname = window.location.href.split("/")[2];
        var tLink = hostname + "/meeting/" + newMeetingNum;
        console.log(tLink);

        this.setState({link: tLink});
        // DISPLAY LINK HERE
      });
      e.preventDefault();
    }

    handleMeetingNameChange(e) {
      this.setState({meetingName: e.target.value})
    }

    handleAdminPasscodeChange(e) {
      this.setState({adminPasscode: e.target.value})
    }

    handleMemberPasscodeChange(e) {
      this.setState({memberPasscode: e.target.value})
    }

    copyLink(){
        var copyText = document.getElementById("copyLink");
        console.log(copyText);
        copyText.select();
        document.execCommand("copy");
        alert("Copied the link: " + copyText.value);
    }

    render() {
        return (
        <div className="bkg">
          <form onSubmit={this.createMeetingForm}>
            Meeting Name:
            <input type="text" name="meetingName" value = {this.state.meetingName} onChange = {this.handleMeetingNameChange} /><br/><br/>

            Admin Passcode:
            <input type="text" name="adminPasscode" value = {this.state.adminPasscode} onChange = {this.handleAdminPasscodeChange}/><br/><br/>
            Member Passcode:
            <input type="text" name="memberPasscode" value = {this.state.memberPasscode} onChange = {this.handleMemberPasscodeChange}/><br/><br/>

            <input type="submit"/>
          </form>
          <br/>
          <div>

              {this.state.link}<br/>
              {this.state.link === "" ? null :
                  <CopyToClipboard text={this.state.link}
                    onCopy={() => this.setState({copied: true})}>
                    <button>Copy Link</button>
                  </CopyToClipboard>
              }

              {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
          </div>



          </div>

        );
    }
}

export default Meeting;
