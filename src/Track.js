import React, { Component, PureComponent } from 'react';

import { MIDINote, MIDITrack, MIDIDatastore } from './MIDIDatastore.js';
import { TrackRow } from './TrackRow.js';
import { generateID } from './Utils.js';

import FontIcon from 'material-ui/FontIcon';

import './Track.css';

class Track extends PureComponent {
  constructor() {
    super();
    console.log("track constructor called");

    var TrackRows = new Array(88);

    for (var i = 0; i < TrackRows.length; i++) {
      TrackRows[i] = <TrackRow/>;
    }

    var piano = [false, true, false,
      false, true, false, true, false,
      false, true, false, true, false, true, false,
      false, true, false, true, false,
      false, true, false, true, false, true, false,
      false, true, false, true, false,
      false, true, false, true, false, true, false,
      false, true, false, true, false,
      false, true, false, true, false, true, false,
      false, true, false, true, false,
      false, true, false, true, false, true, false,
      false, true, false, true, false,
      false, true, false, true, false, true, false,
      false, true, false, true, false,
      false, true, false, true, false, true, false,
      false
    ];
    for (var i=0; i < piano.length; i++) {
        if (piano[i]) {
          piano[i] = (<div className="piano-key black"></div>);
        } else {
          piano[i] = (<div className="piano-key white"></div>);
        }
    }
    piano.reverse();

    this.state = {
      piano: piano,
      trackRows: TrackRows
    }
  }

  render() {
    var midiBody;
    if (this.state.trackRows.length) {
      midiBody = (
        <div className="piano-container">
          {this.state.trackRows}
        </div>
      );
    }

    return (
      <div className="track-container">
        <div className="track-info">
          <FontIcon className="material-icons close-link"  onClick={() => this.props.trackDeleteClicked(this.props.track)}>close</FontIcon>
          <br />
          <p>{this.props.track.name}</p>
        </div>

        <div className="pianoroll-container">
          <div className="piano">
            {this.state.piano}
          </div>
          {midiBody}
        </div>
    </div>
    );
  }
}

export default Track;
