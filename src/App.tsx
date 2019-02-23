import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import AirportsSelect from "./components/AirportsSelect";
import FlightsList from "./components/FlightsList";

interface IState {
  from: string;
  to: string;
}

class App extends Component<{}, IState> {
  public constructor(props: {}) {
    super(props);
    this.state = {
      from: "",
      to: "",
    };
  }

  public onSelectChange = (from: string, to: string, date: string) => {
    this.setState({
      from,
      to,
    });
  };

  public render() {
    return (
      <div className="App">
        <AirportsSelect onChange={this.onSelectChange} />
        <FlightsList
          from={this.state.from}
          to={this.state.to}
          date="2019-02-16"
        />
      </div>
    );
  }
}

export default App;
