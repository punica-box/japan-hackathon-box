import * as React from "react";
import BasicButton from "../../atoms/button";

export interface IformResultApproveProps {
  onformResultApprove: () => void;
  style?: React.CSSProperties;
}

export interface IformResultApproveState {}

const initialState = {};

export default class FormResultApproveMol extends React.Component<IformResultApproveProps, IformResultApproveState> {
  constructor(props: IformResultApproveProps) {
    super(props);
    this.state = initialState;
  }

  render() {
    return (
      <div style={this.props.style}>
        ok?
        <BasicButton
          onClick={() => {
            this.props.onformResultApprove();
            this.setState(initialState);
          }}
        >
          approve
        </BasicButton>
      </div>
    );
  }
}
