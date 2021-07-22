import React, { Component, setState } from 'react';
import { PrismCode } from 'react-prism';
import { Player, ControlBar, PlaybackRateMenuButton, ClosedCaptionButton } from 'video-react';
import { Button } from 'reactstrap';

import '../App.css';

const sources = {
  sintelTrailer: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
  bunnyTrailer: 'http://media.w3.org/2010/05/bunny/trailer.mp4',
  bunnyMovie: 'http://media.w3.org/2010/05/bunny/movie.mp4',
  test: 'http://media.w3.org/2010/05/video/movie_300.webm'
};

export default class VideoPlayer extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      source: sources.bunnyMovie
    };

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.load = this.load.bind(this);
    this.changeCurrentTime = this.changeCurrentTime.bind(this);
    this.seek = this.seek.bind(this);
    this.changePlaybackRateRate = this.changePlaybackRateRate.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.setMuted = this.setMuted.bind(this);
 
  }

  componentDidMount() {
    // subscribe state change
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  setMuted(muted) {
    return () => {
      this.player.muted = muted;
    };
  }

  handleStateChange(state) {
    // copy player state to this component's state
    this.setState({
      player: state
    });
  }

  play() {
    this.player.play();
  }

  pause() {
    this.player.pause();
  }

  load() {
    this.player.load();
  }

  changeCurrentTime(seconds) {
    return () => {
      const { player } = this.player.getState();
      this.player.seek(player.currentTime + seconds);
    };
  }

  seek(seconds) {
    return () => {
      this.player.seek(seconds);
    };
  }

  changePlaybackRateRate(steps) {
    return () => {
      const { player } = this.player.getState();
      this.player.playbackRate = player.playbackRate + steps;
    };
  }

  changeVolume(steps) {
    return () => {
      const { player } = this.player.getState();
      this.player.volume = player.volume + steps;
    };
  }

  changeSource(name) {
    return () => {
      this.setState({
        source: sources[name]
      });
      this.player.load();
    };
  }

  advanceVideo(){
    alert("10 saniye ileri");

    this.changeCurrentTime(10)
  }

  rewindVideo(){
    alert("10 saniye geri");

    this.changeCurrentTime(-10);

  }

  render() {
    return (
      <div className="VideoPlayer">
        <Player
          ref={player => {
            this.player = player;
          }}
          
        >
          
          <div className="left" onDoubleClick={this.changeCurrentTime(-10)}>
            <h5></h5>
          </div>
          <div className="right" onDoubleClick={this.changeCurrentTime(10)} >
              <h5></h5>
          </div>
          
          <source src={this.props.videoURL} />

          <ControlBar autoHide={false} >
            <PlaybackRateMenuButton rates={[5, 2.5, 1.5, 1, 0.5, 0.25, 0.1]} order={7.1} />
          </ControlBar>
        </Player>
        
        </div>
    );
  }
}
