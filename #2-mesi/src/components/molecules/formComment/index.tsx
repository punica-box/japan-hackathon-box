import * as React from "react";
import { TextField, Button } from "@material-ui/core";

export interface IformCommentProps {
  onformCommentPost: (v: string) => void;
  onformCommentSuperchat: (v?: string) => void;
  myAddress: string;
  style?: any;
}

export interface IformCommentState {
  msg: string;
}

export default class FormComment extends React.Component<
  IformCommentProps,
  IformCommentState
> {
  constructor(props: IformCommentProps) {
    super(props);
    this.state = {
      msg: ""
    };
  }

  render() {
    return (
      <div
        style={{
          border: "1px solid",
          borderRadius: 4,
          borderWidth: 0.5,
          borderColor: "#d6d7da",
          margin: 3,
          padding: 10,
          ...this.props.style
        }}
      >
        {this.props.myAddress}
        <br />
        <TextField
          onChange={e => {
            this.setState({ msg: e.target.value });
          }}
          value={this.state.msg}
          label="comment"
          style={{ width: "80%" }}
        />
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Button
              onClick={() => {
                this.props.onformCommentSuperchat();
              }}
            >
              super chat
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                this.props.onformCommentPost(this.state.msg);
                this.setState({ msg: "" });
              }}
            >
              post
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
