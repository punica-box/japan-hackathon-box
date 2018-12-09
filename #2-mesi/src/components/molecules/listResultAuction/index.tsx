import * as React from "react";
import ViewAuctionResult, { IviewAuctionResultProps } from "../../atoms/viewAuctionResult";
import { ResultAuction } from '../../../interface';

export interface IlistResultAuctionProps extends IviewAuctionResultProps {
  listResultAuction: ResultAuction[];
  style?: React.CSSProperties;
}

export interface IlistResultAuctionState {}

export default class ListResultAuctionMol extends React.Component<IlistResultAuctionProps, IlistResultAuctionState> {
  constructor(props: IlistResultAuctionProps) {
    super(props);
    this.state = {};
  }

  private renderComment(result:ResultAuction, i: number) {
    return <ViewAuctionResult {...this.props} resultAuction={result} key={i} />;
  }

  render() {
    return (
      <div style={{ ...this.props.style, overflow: "scroll" }}>
        {this.props.listResultAuction.map((v, i) => this.renderComment(v, i))}
      </div>
    );
  }
}
