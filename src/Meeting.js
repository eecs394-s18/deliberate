import React, { Component } from 'react';
import styles from './Meeting.css'
class Meeting extends Component {
    constructor(props) {
        super(props);
        this.state = {
          meetingName: "",
          adminPasscode: "",
          memberPasscode: "",
        };
        this.createMeetingForm = this.createMeetingForm.bind(this);
        this.handleMeetingNameChange = this.handleMeetingNameChange.bind(this);
        this.handleAdminPasscodeChange = this.handleAdminPasscodeChange.bind(this);
        this.handleMemberPasscodeChange = this.handleMemberPasscodeChange.bind(this);
    }


    createMeetingForm(e) {
      console.log(this.state.meetingName);
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


          </div>

        );
    }
}

export default Meeting;
