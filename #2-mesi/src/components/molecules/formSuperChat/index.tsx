import * as React from "react";
import { TextField, Button } from "@material-ui/core";

export interface IformSuperChatProps {
  onformSuperChatPost: (msg: string, amount: number) => void;
  myAddress: string;
}

export interface IformSuperChatState {
  comment: string;
  amount: number;
}

const initalState: IformSuperChatState = {
  comment: "",
  amount: 0
};

export default class FormSuperChat extends React.Component<
  IformSuperChatProps,
  IformSuperChatState
> {
  constructor(props: IformSuperChatProps) {
    super(props);
    this.state = initalState;
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
          padding: 10
        }}
      >
        {this.props.myAddress}
        <br />
        <TextField
          onChange={e => {
            this.setState({ comment: e.target.value });
          }}
          value={this.state.comment}
          label="comment"
          style={{ width: "80%" }}
        />
        <TextField
          onChange={e => {
            this.setState({ amount: parseInt(e.target.value, 10) });
          }}
          value={this.state.amount}
          type="number"
          label="amount"
          style={{ width: "80%" }}
        />
        <br />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div>
            <Button
              onClick={() => {
                this.props.onformSuperChatPost(
                  this.state.comment,
                  this.state.amount
                );
                this.setState(initalState);
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
