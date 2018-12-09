import * as React from "react";
import { HumanData } from "../../../interface";

export interface IdetailWorkerProps {
  detailHuman?: HumanData;
  style?: React.CSSProperties;
}

export interface IdetailWorkerState {}

export default class DetailWorkerMol extends React.Component<IdetailWorkerProps, IdetailWorkerState> {
  constructor(props: IdetailWorkerProps) {
    super(props);
  }

  renderView(human: HumanData) {
    return (
      <div>
        name　{human.name}
        <br />
        company　{human.company}
        <br />
        address　{human.address}
      </div>
    );
  }

  render() {
    const { detailHuman } = this.props;
    return <div style={this.props.style}>{detailHuman ? this.renderView(detailHuman) : undefined}</div>;
  }
}
