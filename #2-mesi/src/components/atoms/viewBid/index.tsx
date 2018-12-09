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
    return `${bid.companyAddr}　${bid.price}`;
  }

  public render() {
    const { viewBid } = this.props;
    return <div style={this.props.style}>{viewBid ? this.renderView(viewBid) : "undefined"}</div>;
  }
}
