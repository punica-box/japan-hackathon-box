import * as React from "react";
import { TextField, Button } from "@material-ui/core";
import { HumanData } from "../../../interface";

export interface IformAddWorkerProps {
  onformAddWorker: (v: HumanData) => void;
}

const initialState: HumanData = { address: "", name: "", company: "" };

export default class FormAddWorkerMol extends React.Component<IformAddWorkerProps, HumanData> {
  constructor(props: IformAddWorkerProps) {
    super(props);
    this.state = initialState;
  }

  render() {
    return (
      <div
        style={{
          border: "1px solid",
          borderRadius: 4,
          borderWidth: 0.5,
          borderColor: "#d6d7da",
          margin: 3,
          padding: 10
        }}
      >
        <TextField
          onChange={e => {
            this.setState({ address: e.target.value });
          }}
          value={this.state.mail}
          label="address"
        />
        <br />
        <TextField
          onChange={e => {
            this.setState({ name: e.target.value });
          }}
          value={this.state.name}
          label="name"
        />

        <br />

        <Button
          onClick={() => {
            this.props.onformAddWorker(this.state);
            this.setState(initialState);
          }}
        >
          add
        </Button>
      </div>
    );
  }
}
