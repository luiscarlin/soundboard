import React from "react";
import { ReactMic } from "react-mic";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false
    };
  }

  startRecording() {
    this.setState({
      record: true
    });
  }

  stopRecording() {
    this.setState({
      record: false
    });
  }

  onData(recordedBlob) {
    console.log("chunk of real-time data is: ", recordedBlob);
  }

  onStop(recordedBlob) {
    console.log("onStop => recordedBlob is: ", recordedBlob);
    this.setState({ blobURL: recordedBlob.blobURL });
  }

  render() {
    const { blobURL, isRecording, isPaused } = this.state;
    return (
      <div>
        <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={recordedBlob => this.onStop(recordedBlob)}
          onData={this.onData}
          strokeColor="#000000"
          backgroundColor="#FF4081"
        />
        <button onClick={() => this.startRecording()} type="button">
          Start
        </button>
        <button onClick={() => this.stopRecording()} type="button">
          Stop
        </button>
        <audio ref="audioSource" controls="controls" src={blobURL} />
      </div>
    );
  }
}
