import * as React from "react";

import ListResultSearchHuman, { IlistResultSearchHumanProps } from "../../molecules/listResultSearchHuman";

export interface IsearchHumanOrgProps extends IlistResultSearchHumanProps {
  style?: React.CSSProperties;
}

export default class SearchHumanOrg extends React.Component<IsearchHumanOrgProps, {}> {
  constructor(props: IsearchHumanOrgProps) {
    super(props);
  }

  public render() {
    return (
      <div style={this.props.style}>
        <ListResultSearchHuman {...this.props} />
      </div>
    );
  }
}
