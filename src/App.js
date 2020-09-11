import React, { Component } from "react";
import FetchedData from "./containers/FetchedData/FetchedData";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <div className="Title">
          <h1>Please click on a button to display the Array data</h1>
        </div>
        <FetchedData />
      </div>
    );
  }
}

export default App;
