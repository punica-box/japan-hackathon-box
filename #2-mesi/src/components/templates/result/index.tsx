import * as React from "react";
import HeaderOrg, { IheaderOrgProps } from "../../organisms/header";
import ListResultAuctionMol, { IlistResultAuctionProps } from "../../molecules/listResultAuction";
import ResultRightOrg, { IresultRightOrgProps } from "../../organisms/resultRight";

export interface IResultTempProps extends IheaderOrgProps, IlistResultAuctionProps, IresultRightOrgProps {}

export interface IResultTempState {}

export default class ResultTemp extends React.Component<IResultTempProps, IResultTempState> {
  constructor(props: IResultTempProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <HeaderOrg {...this.props} />

        <div style={{ display: "flex" }}>
          <ListResultAuctionMol {...this.props} style={{ flex: 1, height: "90vh" }} />
          <ResultRightOrg {...this.props} style={{ flex: 3 }} />
        </div>
      </div>
    );
  }
}
