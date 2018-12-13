import * as React from "react";
import { Typography, Button } from "@material-ui/core";
import Blockies from "react-blockies-image";
import { HumanData } from "../../../interface";

export interface IviewScoutProps {
  humanScout?: HumanData;
  onViewScout: (human: HumanData) => void;
}

export default class ViewScout extends React.Component<IviewScoutProps, {}> {
  constructor(props: IviewScoutProps) {
    super(props);
  }

  renderView(human: HumanData) {
    return (
      <Button
        onClick={() => {
          this.props.onViewScout(human);
        }}
        style={{ maxWidth: "50vh" }}
      >
        <div style={{ padding: 10 }}>
          <Blockies seed={human.name} scale={3} />
        </div>
        <Typography style={{ padding: 10 }}>name　{human.name}</Typography>
        <Typography style={{ padding: 10 }}>company　{human.company}</Typography>
      </Button>
    );
  }

  public render() {
    const { humanScout } = this.props;
    return <div>{humanScout ? this.renderView(humanScout) : undefined}</div>;
  }
}
