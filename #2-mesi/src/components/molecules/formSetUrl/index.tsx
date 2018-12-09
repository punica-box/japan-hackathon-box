import * as React from "react";
import { TextField, Button } from "@material-ui/core";

export interface IopenurlProps {
  onOpenUrl: (v?: string) => void;
}

export interface IopenurlState {
  url: string;
}

export default class OpenUrl extends React.Component<
  IopenurlProps,
  IopenurlState
> {
  constructor(props: IopenurlProps) {
    super(props);
    this.state = {
      url: ""
    };
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
            this.setState({ url: e.target.value });
          }}
          value={this.state.url}
          label="url"
          style={{ width: "80%" }}
        />
        <Button
          onClick={() => {
            this.props.onOpenUrl(this.state.url);
            this.setState({ url: "" });
          }}
        >
          open
        </Button>
      </div>
    );
  }
}
