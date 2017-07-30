import React, { Component } from 'react';

import { MIDINote, MIDITrack, MIDIDatastore } from './MIDIDatastore.js';
import { TrackRow } from './TrackRow.js';
import { generateID } from './Utils.js';

import './Track.css';

class Track extends Component {
  constructor() {
    super();

    var MIDIroll = new Array(88);

    for (var i = 0; i < MIDIroll.length; i++) {
      MIDIroll[i] = <TrackRow name="THIS IS A TEST"/>;
    }

    this.state = {
      midiRow: MIDIroll
    }
  }

  render() {
    var midiBody;

    if (this.state.midiRow.length) {
      midiBody = (
        <div className="piano-container">
          {this.state.midiRow}
        </div>
      );
    }

    return (
      <div className="track-container">
        <div className="track-info">
          <p>{this.props.track.name}</p>
          <a className="close-link" onClick={() => this.props.trackDeleteClicked(this.props.track)}>x</a>
      	</div>
        {midiBody}
      </div>
    );
  }
}

export default Track;
