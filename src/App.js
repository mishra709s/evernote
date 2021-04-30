import React, { Component } from "react";
import "./App.css";

import firebase from "firebase";
import Editor from "./Editor/Editor";
import Sidebar from "./Sidebar/Sidebar";

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: [],
    };
  }

  selectNote = (note, index) => {
    this.setState({ selectedNoteIndex: index, selectedNote: note });
  };

  noteUpdate = (id, noteObj) => {
    firebase.firestore().collection("notes").doc(id).update({
      title: noteObj.title,
      body: noteObj.body,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  newNote = async (title) => {
    const note = {
      title: title,
      body: "",
    };

    const newFromDB = await firebase.firestore().collection("notes").add({
      title: note.title,
      body: note.body,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    const newID = newFromDB.id;
    await this.setState({ notes: [...this.state.notes, note] });
    const newNoteIndex = this.state.notes.indexOf(
      this.state.notes.filter((note) => note.id === newID)[0]
    );
    this.setState({
      selectNote: this.state.notes[newNoteIndex],
      selectedNoteIndex: newNoteIndex,
    });
  };

  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState({
      notes: this.state.notes.filter((_note) => _note !== note),
    });
    if (this.state.selectedNoteIndex === noteIndex) {
      this.setState({ selectedNoteIndex: null, selectedNote: null });
    } else {
      this.state.notes.length > 1
        ? this.selectNote(
            this.state.notes[this.state.selectedNoteIndex - 1],
            this.state.selectedNoteIndex - 1
          )
        : this.setState({ selectedNoteIndex: null, selectedNote: null });
    }

    firebase.firestore().collection("notes").doc(note.id).delete();
  };

  render() {
    return (
      <>
        <Sidebar
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          newNote={this.newNote}
        />
        {this.state.selectedNote ? (
          <Editor
            selectedNoteIndex={this.state.selectedNoteIndex}
            selectedNote={this.state.selectedNote}
            notes={this.state.notes}
            noteUpdate={this.noteUpdate}
          />
        ) : null}
      </>
    );
  }

  componentDidMount = () => {
    firebase
      .firestore()
      .collection("notes")
      .onSnapshot((serverDetails) => {
        const notes = serverDetails.docs.map((doc) => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });
        console.log(notes);
        this.setState({ notes: notes });
      });
  };
}

export default App;
