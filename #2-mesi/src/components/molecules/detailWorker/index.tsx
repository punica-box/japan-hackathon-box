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
        <ul>
          <div
            style={{
              display: "inline-block",
              width: "80%",
              backgroundColor: "#333",
              color: "#FFF",
              padding: "12px",
              border: "solid 2px #333"
            }}
          >
            <dt
              style={{
                fontWeight: "bold"
              }}
            >
              name
            </dt>
            <dd
              style={{
                fontWeight: "bold"
              }}
            >
              {human.name}
            </dd>
          </div>
          <div
            style={{
              display: "inline-block",
              width: "80%",
              padding: "12px",
              border: "solid 2px #333"
            }}
          >
            <dt>company</dt>
            <dd>{human.company}</dd>
            <dt>address</dt>
            <dd>{human.address}</dd>
          </div>
        </ul>
      </div>
    );
  }

  render() {
    const { detailHuman } = this.props;
    return <div style={this.props.style}>{detailHuman ? this.renderView(detailHuman) : undefined}</div>;
  }
}
