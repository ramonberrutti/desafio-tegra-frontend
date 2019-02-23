import React from "react";
import axios from "axios";
import { IFullFlight, IPatch } from "./Flight";

function totalCost(paths: IPatch[]): number {
  let cost = 0;
  paths.forEach(v => {
    cost += v.preco;
  });

  return cost;
}

interface IProps {
  from: string;
  to: string;
  date: string;
}
interface IState {
  flights: IFullFlight[];
}

class FlightsList extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);

    this.state = {
      flights: [],
    };
  }

  public componentDidMount() {
    this.doRequest();
  }

  public componentDidUpdate(nextprops: IProps) {
    if (
      nextprops.date !== this.props.date ||
      nextprops.from !== this.props.from ||
      nextprops.to !== this.props.to
    ) {
      this.doRequest();
    }
  }

  public render() {
    return (
      <div>
        <ul>
          {this.state.flights.map((flight, index) => (
            <li key={index}>
              <p>
                {flight.origem} --> {flight.destino} $
                {totalCost(flight.trechos)}
              </p>
              <ol>
                {flight.trechos.map((path, index) => (
                  <li key={index}>
                    <p>
                      {path.origem} --> {path.destino} ${path.preco}
                    </p>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  private doRequest = () => {
    if (
      this.props.from === "" ||
      this.props.to === "" ||
      this.props.date === ""
    ) {
      return;
    }

    axios
      .get<IFullFlight[]>(
        "http://localhost:8080/flights?from=" +
          this.props.from +
          "&to=" +
          this.props.to +
          "&date=" +
          this.props.date
      )
      .then(response => {
        this.setState({ flights: response.data });
      });
  };
}

export default FlightsList;
