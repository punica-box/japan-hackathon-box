import * as React from "react";
import { HumanData, Ibid } from "../../../interface";
import ViewBid from "../../atoms/viewBid";

export interface Ibid {
  human: HumanData[];
  amount: number;
}

export interface IlistBidProps {
  listBid: Ibid[];
}

export interface IlistBidState {}

export default class ListBidMol extends React.Component<IlistBidProps, IlistBidState> {
  constructor(props: IlistBidProps) {
    super(props);
    this.state = {};
  }

  private renderComment(bid: Ibid, i: number) {
    return <ViewBid viewBid={bid} key={i} />;
  }

  render() {
    const { listBid } = this.props;
    listBid.sort((a: Ibid, b: Ibid) => a.price - b.price).reverse();
    return <div style={{ overflow: "scroll" }}>{listBid.map((v, i) => this.renderComment(v, i))}</div>;
  }
}
