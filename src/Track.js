// vim: ts=2 sw=2

import React, { Component } from 'react';

import { TrackRow } from './TrackRow.js';

// MATERIAL UI
import FontIcon from 'material-ui/FontIcon';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';  

import './Track.css';

export const PIANO_MIDI_OFFSET = 9; // typical piano starts at MIDI note 9 for A0

class Track extends Component {
  constructor() {
    super();

    console.log("track constructor called");

    this.finishDragOrResize = this.finishDragOrResize.bind(this);

    this.pianoElements = [false, true, false,
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
    for (var i=0; i < this.pianoElements.length; i++) {
        var pitch = i + PIANO_MIDI_OFFSET;
        if (this.pianoElements[i]) {
          this.pianoElements[i] = (<div className="piano-key black" key={i}>{pitch}</div>);
        } else {
          this.pianoElements[i] = (<div className="piano-key white" key={i}>{pitch}</div>);
        }
    }
    this.pianoElements.reverse();

    this.state = {
      mouseActive: false,
      moveDuration: null,
      resizedNote: null,
      resizedCell: null,
    }
  }

  handleChange = (event, index, instrument) => {
      this.props.trackInstrumentUpdated(this.props.track, instrument);
  }

  finishDragOrResize() {
    if (this.state.resizedNote) {
      let new_duration = this.state.resizedCell.getResizeDuration();
      this.state.resizedCell.resizeFinish();
      let res_note = this.state.resizedNote;
      res_note.duration = new_duration;
      this.props.noteAddedOrUpdatedCallback(this.props.track, res_note);
    }
    this.setState({
      mouseActive: false,
      moveDuration: null,
      resizedNote: null,
      resizedCell: null
    });
  }

  render() {
    console.log(this.props.track);
    var notesByPitch = {};
    for (let note of Object.values(this.props.notes)) {
      if (!(note.pitch in notesByPitch)) {
        notesByPitch[note.pitch] = [];
      }
      notesByPitch[note.pitch].push(note);
    }

    var trackRows = [];
    for (var i = 0; i < 88; i++) {
      let pitch = PIANO_MIDI_OFFSET + 87 - i;
      trackRows.push(<TrackRow
        key={pitch}
        pitch={pitch}
        notes={notesByPitch[pitch] || []}
        mouseActive={this.state.mouseActive}
        moveDuration={this.state.moveDuration}
        noteAdded={note => this.props.noteAddedOrUpdatedCallback(this.props.track, note)}
        noteDeleted={note => this.props.noteDeletedCallback(this.props.track, note)}
        noteDragStarted={note => {
          this.props.noteDeletedCallback(this.props.track, note);
          this.setState({mouseActive: true, moveDuration: note.duration});
        }}
        noteResizeStarted={(note, cell) => {
          this.setState({
            resizedNote: note,
            resizedCell: cell
          });
        }}/>);
    }

    return (
      <div className="track-container"
           onContextMenu={evt => evt.preventDefault()}
           onMouseDown={evt => evt.button !== 2 && this.setState({mouseActive: true})}
           onMouseUp={this.finishDragOrResize}
           onMouseLeave={this.finishDragOrResize}
           onMouseMove={evt => {
             if (this.state.resizedNote) {
               this.state.resizedCell.resizeUpdate(evt, this.pianoConDiv.getBoundingClientRect());
             }
           }}>

        <div className="track-info">
          <FontIcon className="material-icons close-link"  onClick={() => this.props.trackDeleteClicked(this.props.track)}>close</FontIcon>
          <br />
          <p>{this.props.track.name}</p>
          <DropDownMenu 
            value={this.props.track.instrument} 
            onChange={this.handleChange}
            iconStyle={{fill: '#8D6E63'}}
            underlineStyle={{borderColor: '#8D6E63'}}
          >
            <MenuItem value={0} primaryText="RAW" />
            <MenuItem value={1} primaryText="Instrument1" />
            <MenuItem value={2} primaryText="Instrument2" />
            <MenuItem value={3} primaryText="Instrument3" />
            <MenuItem value={4} primaryText="Instrument4" />
            <MenuItem value={5} primaryText="Instrument5" />
          </DropDownMenu>
          <Slider defaultValue={1} className="track-info-slider"/>
        </div>

        <div className="pianoroll-container">
          <div className="piano">
            {this.pianoElements}
          </div>
          <div className="piano-container" ref={div => { this.pianoConDiv = div; }}>
            {trackRows}
          </div>
        </div>
    </div>
    );
  }
}

export default Track;
