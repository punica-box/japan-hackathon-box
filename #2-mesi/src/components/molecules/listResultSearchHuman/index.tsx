import * as React from "react";
import { HumanData } from "../../../interface";
import ViewScout, { IviewScoutProps } from "../../atoms/viewScout";

export interface IlistResultSearchHumanProps extends IviewScoutProps {
  listResultSearchHumans: HumanData[];
  maxheight?: string;
  style?: React.CSSProperties;
}

export interface IlistResultSearchHumanState {}

export default class ListResultSearchHuman extends React.Component<
  IlistResultSearchHumanProps,
  IlistResultSearchHumanState
> {
  url?: string;
  constructor(props: IlistResultSearchHumanProps) {
    super(props);
    this.state = {
      url: undefined
    };
  }

  private renderComment(human: HumanData, i: number) {
    return <ViewScout {...this.props} humanScout={human} key={i} />;
    // <ViewComment id={comment.id} msg={comment.msg} key={i} />;
  }

  render() {
    const { maxheight } = this.props;
    return (
      <div
        style={{
          border: "1px solid",
          borderRadius: 4,
          borderWidth: 0.5,
          borderColor: "#d6d7da",
          margin: 3,
          padding: 10,
          maxHeight: maxheight ? maxheight : "50vh",
          overflow: "scroll",
          ...this.props.style
        }}
      >
        {this.props.listResultSearchHumans.map((v, i) => this.renderComment(v, i))}
      </div>
    );
  }
}
