import * as React from "react";
import { Button } from "@material-ui/core";
import { ResultAuction } from '../../../interface';

export interface IviewAuctionResultProps {
  resultAuction?: ResultAuction;
  onViewAuctionResult: (resultHuman: ResultAuction) => void;
}

export default class ViewAuctionResult extends React.Component<IviewAuctionResultProps, {}> {
  constructor(props: IviewAuctionResultProps) {
    super(props);
  }

  renderView(human:ResultAuction) {
    return `${human.human.name}　${human.price}`;
  }

  public render() {
    const { resultAuction, onViewAuctionResult } = this.props;
    return (
      <div>
        <Button
          onClick={() => {
            if (resultAuction) onViewAuctionResult(resultAuction);
          }}
        >
          {resultAuction ? this.renderView(resultAuction) : undefined}
        </Button>
      </div>
    );
  }
}
