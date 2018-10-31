import React from "react";

import "./style.css";
import alienAlarm from "./Alien_Siren.wav";


export class ClockDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerSession: 1500,
      timerBreak: 300,
      play: false,
      onSession: true,
      playSound: () => {
        let is_chrome = (typeof window.chrome === "object" && navigator.appVersion.indexOf('Edge') === -1);
        if (is_chrome) {
          let sound = document.getElementById("beep");
          if (sound !== null) {
            sound.currentTime = 5;
            sound.play();
          }
        }
      },
    }

    this.getTimer = this.getTimer.bind(this);
    this.breakInc = this.breakInc.bind(this);
    this.breakDec = this.breakDec.bind(this);
    this.sessionInc = this.sessionInc.bind(this);
    this.sessionDec = this.sessionDec.bind(this);
    this.play = this.play.bind(this);
    this.reset = this.reset.bind(this);

    this.countDown = this.countDown.bind(this);
  }

  reset() {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timerSession: 1500,
      timerBreak: 300,
      play: false,
      onSession: true,
    })
  }
  play() {
    this.setState({play: !this.state.play});
  }

  sessionDec() {
    if (this.state.sessionLength !== 1 && !this.state.play) {
      let time = this.state.sessionLength - 1;
      this.setState({sessionLength: time, timerSession: time*60});
    }
  }

  sessionInc() {
    if (this.state.sessionLength !== 60 && !this.state.play) {
      let time = this.state.sessionLength + 1;
      this.setState({sessionLength: time, timerSession: time*60});
    }
  }

  breakDec() {
    if (this.state.breakLength !== 1 && !this.state.play) {
      let time = this.state.breakLength - 1;
      this.setState({breakLength: time, timerBreak: time*60});
    }
  }

  breakInc() {
    if (this.state.breakLength !== 60 && !this.state.play) {
      let time = this.state.breakLength + 1;
      this.setState({breakLength: time, timerBreak: time*60});
    }
  }

  getTimer(num) {
    let minutes = Math.floor(num/60);
    if (minutes < 10) minutes = "0" + minutes;

    let seconds = num % 60;
    if (seconds < 10) seconds = "0" + seconds;

    return minutes + ":" + seconds;
  }


  componentDidMount() {
    var intervalId = setInterval(this.countDown, 1000);
    this.setState({intervalId: intervalId});
  }
  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }
  countDown() {
    if (!this.state.play) return;
    // let is_chrome = (typeof window.chrome === "object" && navigator.appVersion.indexOf('Edge') === -1)
    // let sound = document.getElementById("beep");
    if (this.state.onSession) {
      if (this.state.timerSession > 0) {
        this.setState({timerSession: this.state.timerSession-1});
      } else if (this.state.timerSession <= 0) {
        this.setState({
          onSession: !this.state.onSession,
          timerSession: this.state.sessionLength * 60,
        });
        this.state.playSound();
        // if (is_chrome) {
        //   sound.currentTime = 5;
        //   sound.play();
        // }
      }
    } else if (!this.state.onSession) {
      if (this.state.timerBreak > 0) {
        this.setState({timerBreak: this.state.timerBreak-1});
      } else if (this.state.timerBreak <= 0) {
        this.setState({
          onSession: !this.state.onSession,
          timerBreak: this.state.breakLength * 60,
        });
        this.state.playSound();
        // if (is_chrome) {
        //   sound.currentTime = 5;
        //   sound.play();
        // }
      }
    }
  }
  render() {


    return (
      <div id="main">
        <div id="title" className="center-all">
          <h1>Pomodoro Clock</h1>
        </div>
        <div id="break-session" className="center-all flex-row">
          <div id="break">
            <div id="break-label" className="center-all">
              <h2>Break Length</h2>
            </div>
            <div id="break-length-row" className="center-all flex-row">
              <i onClick={this.breakInc} id="break-increment" className="fas fa-arrow-up fa-2x LTG"></i>
              <div id="break-length" className="LTG">{this.state.breakLength}</div>
              <i onClick={this.breakDec} id="break-decrement" className="fas fa-arrow-down fa-2x LTG"></i>
            </div>
          </div>
          <div id="session">
            <div id="session-label">
              <h2>Session Length</h2>
            </div>
            <div id="session-length-row" className="center-all flex-row">
              <i onClick={this.sessionInc} id="session-increment" className="fas fa-arrow-up fa-2x LTG"></i>
              <div id="session-length" className="LTG">{this.state.sessionLength}</div>
              <i onClick={this.sessionDec} id="session-decrement" className="fas fa-arrow-down fa-2x LTG"></i>
            </div>
          </div>
        </div>
        <div id="timer" className="center-all">
          <div id="timer-label">
            {(this.state.onSession) ? "Session" : "Break"}
          </div>
          <div id="time-left">
            {(this.state.onSession) ? this.getTimer(this.state.timerSession) : this.getTimer(this.state.timerBreak)}
            <audio src={alienAlarm} id="beep" />
          </div>
        </div>
        <div id="controls" className="center-all">
          {/* <button onClick={this.play} id="start_stop">play/stop</button> */}
          <i onClick={this.play} id="start_stop" className="fas fa-play fa-2x LTG"><i id="pause" className="fas fa-pause"></i></i>
          {/* <button onClick={this.reset} id="reset">reset</button> */}
          <i onClick={this.reset} id="reset" className="fas fa-redo fa-2x LTG"></i>
        </div>
        <div id="footer" className="center-all">
          <h6>Created by David Capella</h6>
        </div>
      </div>
    );
  }
}
