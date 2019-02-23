import React, { useEffect } from "react";
import axios from "axios";

import { IAirports } from "./Airports";
import { string } from "prop-types";

interface IListProps {
  airports: IAirports[];
  onChange?: (airport: string) => void;
}

const List: React.FC<IListProps> = props => {
  const [value, setValue] = React.useState<string>("");

  const onChange = (e: React.FocusEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    if (props.onChange) {
      props.onChange(e.target.value);
    }
  };

  return (
    <select onChange={onChange} value={value}>
      {value === "" && (
        <option disabled={true} value={""}>
          -- select an option --
        </option>
      )}
      {props.airports.map((airport, index) => (
        <option key={index} value={airport.aeroporto}>
          {airport.nome} ({airport.aeroporto})
        </option>
      ))}
    </select>
  );
};

// Date List
interface IListDateProps {
  dates: string[];
  onChange: (date: string) => void;
}

const ListDate: React.FC<IListDateProps> = props => {
  const [value, setValue] = React.useState<string>("");

  const onChange = (e: React.FocusEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    if (props.onChange) {
      props.onChange(e.target.value);
    }
  };

  return (
    <select onChange={onChange} value={value}>
      {value === "" && (
        <option disabled={true} value={""}>
          -- select an option --
        </option>
      )}
      {props.dates.map((date, index) => (
        <option key={index} value={date}>
          {date}
        </option>
      ))}
    </select>
  );
};

interface IProps {
  onChange?: (from: string, to: string, date: string) => void;
}

const AirportsSelect: React.FC<IProps> = props => {
  const [fromState, setFromState] = React.useState<string>("");
  const [toState, setToState] = React.useState<string>("");
  const [dateState, setDateState] = React.useState<string>("");
  const [airportsState, setAirportsState] = React.useState<IAirports[]>([]);

  const onFromChange = (from: string) => {
    setFromState(from);
    if (props.onChange) {
      props.onChange(from, toState, dateState);
    }
  };

  const onToChange = (to: string) => {
    setToState(to);
    if (props.onChange) {
      props.onChange(fromState, to, dateState);
    }
  };

  const onDateChange = (date: string) => {
    setDateState(date);
    if (props.onChange) {
      props.onChange(fromState, toState, date);
    }
  };

  const generateDates = (): string[] => {
    let dates: string[] = [];

    for (let i: number = 10; i <= 18; i++) {
      dates.push("2019-02-" + i);
    }

    return dates;
  };

  useEffect(() => {
    axios.get<IAirports[]>("http://localhost:8080/airports").then(response => {
      setAirportsState(response.data);
    });
  }, []);

  return (
    <React.Fragment>
      <h1>Select Airport</h1>
      <div className="AirportsSelect__select">
        From <List airports={airportsState} onChange={onFromChange} />
      </div>
      <div className="AirportsSelect__select">
        To <List airports={airportsState} onChange={onToChange} />
      </div>
      <div className="AirportsSelect__select">
        Date <ListDate dates={generateDates()} onChange={onDateChange} />
      </div>
    </React.Fragment>
  );
};

export default AirportsSelect;
