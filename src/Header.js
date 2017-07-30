import React, { Component } from 'react';
import './App.css';

// MATERIAL UI COMPONENTS
import {Toolbar, ToolbarTitle, ToolbarGroup} from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';

class Header extends Component {
  render() {
    console.log("YO: ", this.props.value);
    return (
      <Paper className="header-container" zDepth={3}>
        <Toolbar className="header-toolbar">
          <ToolbarTitle text="SONGNAME" />    

          <ToolbarGroup>
            <Avatar className="header-avatar" icon={<FontIcon className="material-icons">person</FontIcon>}/>
            <Avatar className="header-avatar" icon={<FontIcon className="material-icons">person</FontIcon>}/>
            <Avatar className="header-avatar" icon={<FontIcon className="material-icons">person</FontIcon>}/>
          </ToolbarGroup>
        </Toolbar>

        <div className="header-subcontainer">
          <Paper className="header-addtrack" zDepth={2}>
            <TextField 
              className="header-addtrack-input" 
              defaultValue="New Track"
              placeholder="create new track"
              value={this.props.create.value}
              onKeyDown={this.props.create.onKeyDown}
              onChange={this.props.create.onChange}
            />
            </Paper>

          <Paper className="header-trackcontrol" zDepth={2}>
            <FontIcon className="material-icons header-trackcontrol-icon">play_arrow</FontIcon>
            <FontIcon className="material-icons header-trackcontrol-icon">pause</FontIcon>
            <FontIcon className="material-icons header-trackcontrol-icon">skip_previous</FontIcon>

            <div className="header-trackcontrol-seek">
              {/* track seeker here*/}
            </div>
          </Paper>
        </div>

      </Paper>
    );
  }
}

export default Header;
