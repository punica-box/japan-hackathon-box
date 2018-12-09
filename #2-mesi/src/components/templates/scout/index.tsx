import * as React from "react";
import HeaderOrg, { IheaderOrgProps } from "../../organisms/header";
import SearchHumanOrg, { IsearchHumanOrgProps } from "../../organisms/searchHuman";
import DetailWorkerMol, { IdetailWorkerProps } from "../../molecules/detailWorker";
import { Button } from "@material-ui/core";

export interface IScoutTempProps extends IheaderOrgProps, IsearchHumanOrgProps, IdetailWorkerProps {
  openAuction: () => void;
}

export default class ScoutTemp extends React.Component<IScoutTempProps, {}> {
  constructor(props: IScoutTempProps) {
    super(props);
  }

  public render() {
    const { detailHuman } = this.props;
    return (
      <div>
        <HeaderOrg {...this.props} />
        <div style={{ display: "flex" }}>
          <SearchHumanOrg {...this.props} />
          <div style={{ display: "flex", flexDirection: "column", height: "90vh" }}>
            <DetailWorkerMol {...this.props} />
            {detailHuman ? (
              <Button style={{ marginTop: "auto" }} onClick={this.props.openAuction}>
                auction
              </Button>
            ) : (
              undefined
            )}
          </div>
        </div>
      </div>
    );
  }
}
