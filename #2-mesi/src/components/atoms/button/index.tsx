import * as React from "react";
import { Button } from "@material-ui/core";

interface Props {
  onClick: (v: any) => void;
}

export default class BasicButton extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <div>
        <Button style={{ backgroundColor: "#333", color: "#FFF" }} onClick={this.props.onClick}>
          click
        </Button>
      </div>
    );
  }
}
