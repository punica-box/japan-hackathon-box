import * as React from "react";
import { Button } from "@material-ui/core";
import { HumanData } from "../../../interface";

export interface IviewWorkerProps {
  resultHuman?: HumanData;
  style?: React.CSSProperties;
  onViewWorker: (resultHuman: HumanData) => void;
}

export default class ViewWorker extends React.Component<IviewWorkerProps, {}> {
  constructor(props: IviewWorkerProps) {
    super(props);
  }

  renderView(human: HumanData) {
    return `${human.name}`;
  }

  public render() {
    const { resultHuman, onViewWorker } = this.props;
    return (
      <div style={this.props.style}>
        <Button
          onClick={() => {
            if (resultHuman) onViewWorker(resultHuman);
          }}
          style={{ width: "100%" }}
        >
          {resultHuman ? this.renderView(resultHuman) : "undefined"}
        </Button>
      </div>
    );
  }
}
