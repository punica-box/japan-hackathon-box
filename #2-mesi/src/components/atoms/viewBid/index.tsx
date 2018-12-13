import * as React from "react";
import { Ibid } from "../../../interface";

export interface IviewBidProps {
  viewBid?: Ibid;
  style?: React.CSSProperties;
}

export default class ViewBid extends React.Component<IviewBidProps, {}> {
  constructor(props: IviewBidProps) {
    super(props);
  }

  renderView(bid: Ibid) {
    return (
      <div>
        <div
          style={{
            display: "inline-block",
            width: "calc(100% - 200px)"
          }}
        >
          {bid.companyAddr}
        </div>
        <div
          style={{
            display: "inline-block",
            width: "200px",
            textAlign: "right",
            paddingRight: "10px"
          }}
        >
          {bid.price}
        </div>
      </div>
    );
  }

  public render() {
    const { viewBid } = this.props;
    return <div style={this.props.style}>{viewBid ? this.renderView(viewBid) : "undefined"}</div>;
  }
}
