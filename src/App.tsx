import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import FlightsList from "./components/FlightsList"

class App extends Component {
  public render() {
    return (
      <div className="App">
        <FlightsList />
      </div>
    );
  }
}

export default App;
