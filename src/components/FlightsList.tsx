import React from "react"
import axios from "axios";
import { IFullFlight } from "./Flight"

interface IState {
  flights: IFullFlight[];
}

class FlightsList extends React.Component<{}, IState> {
  public constructor(props: {}) {
      super(props);

      this.state = {
          flights: []
      };
  }

  public componentDidMount() {
      axios
          .get<IFullFlight[]>("http://localhost:8080/flights?from=VCP&to=BEL&date=2019-02-16")
          .then(response => {
            console.log(response.data);
            this.setState({flights: response.data});
          })
  }

  public render() {
    return (
      <div>
        <ul>
        {this.state.flights.map( (flight, index) => (
          <li key={index}>
            <p>{flight.origem} --> {flight.destino}</p>
            <ol>
            {flight.trechos.map( (path, index) => (
              <li key={index}>
                <p>{path.origem} --> {path.destino}</p>
              </li>
            ))}
            </ol>
          </li>
        ))}
        </ul>
      </div>
    );
  }
}

export default FlightsList;