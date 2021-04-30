import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import firebase from "firebase/app";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyDJbmSmSUPgP3uWTXQcFMCWLt2vI-31Z5w",
  authDomain: "evernote-8d3e8.firebaseapp.com",
  projectId: "evernote-8d3e8",
  storageBucket: "evernote-8d3e8.appspot.com",
  messagingSenderId: "113487608902",
  appId: "1:113487608902:web:c64d334edd348cfc5b1e47",
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
