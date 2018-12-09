import * as React from "react";
import DetailWorkerMol, { IdetailWorkerProps } from "../../molecules/detailWorker";

export interface ImanageRightOrgProps extends IdetailWorkerProps {
  style?: React.CSSProperties;
}

export default class ManageRightOrg extends React.Component<ImanageRightOrgProps, {}> {
  constructor(props: ImanageRightOrgProps) {
    super(props);
  }

  public render() {
    return (
      <div style={this.props.style}>
        <DetailWorkerMol {...this.props} />{" "}
      </div>
    );
  }
}
