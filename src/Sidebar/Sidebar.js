import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
import SidebarItem from "../SidebarItem/SidebarItem";
import styles from "./styles.sidebar";

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      addingNote: false,
      title: null,
    };
  }

  newNoteBtnClick = () => {
    this.setState({ title: null, addingNote: !this.state.addingNote });
  };

  updateTitle = (text) => {
    this.setState({ title: text });
  };

  newNote = () => {
    this.props.newNote(this.state.title);
    this.setState({
      title: null,
      addingNote: false,
    });
  };

  selectNote = (note, index) => this.props.selectNote(note, index);
  deleteNote = (note) => this.props.deleteNote(note);

  render() {
    const { notes, classes, selectedNoteIndex } = this.props;
    return (
      <div className={classes.sidebarContainer}>
        <Button onClick={this.newNoteBtnClick} className={classes.newNoteBtn}>
          {this.state.addingNote ? "Cancel" : "Create Note"}
        </Button>
        {this.state.addingNote ? (
          <div>
            <input
              className={classes.newNoteInput}
              type="text"
              placeholder="Enter Title Here"
              onKeyUp={(e) => this.updateTitle(e.target.value)}
            />
            <Button className={classes.newNoteSubmitBtn} onClick={this.newNote}>
              Submit Note
            </Button>
          </div>
        ) : null}
        <List className={classes.pt0}>
          {notes.map((note, index) => {
            return (
              <div key={index}>
                <SidebarItem
                  note={note}
                  index={index}
                  selectedNoteIndex={selectedNoteIndex}
                  selectNote={this.selectNote}
                  deleteNote={this.deleteNote}
                ></SidebarItem>
                <Divider></Divider>
              </div>
            );
          })}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(Sidebar);
