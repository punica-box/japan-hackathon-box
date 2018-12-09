import * as React from "react";
import { Typography } from "@material-ui/core";
import Blockies from "react-blockies-image";

export interface IviewCommentProps {
  id: string;
  msg: string;
}

export default class ViewComment extends React.Component<IviewCommentProps, {}> {
  constructor(props: IviewCommentProps) {
    super(props);
  }

  public render() {
    return (
      <div
        style={{
          display: "flex",
          border: "1px solid",
          borderRadius: 4,
          borderWidth: 0.5,
          borderColor: "#d6d7da",
          wordBreak: "break-word"
        }}
      >
        <div style={{ padding: 10 }}>
          <Blockies seed={this.props.id} scale={3} />
        </div>
        <Typography style={{ padding: 10 }}>{this.props.id}</Typography>
        <Typography style={{ padding: 10 }}>{this.props.msg}</Typography>
      </div>
    );
  }
}
