import * as React from "react";
import { RouterProps } from "react-router";
import { lifecycle, ReactLifeCycleFunctions } from "recompose";

export const PlayerGameList: React.SFC<RouterProps> = props => {
  function playChinchiro() {
    props.history.push("/play-chinchiro");
  }

  return (
    <div>
      <button onClick={playChinchiro}>playChinchiro</button>
    </div>
  );
};

const lifeCycleFunctions: ReactLifeCycleFunctions<RouterProps, {}> = {
  componentWillMount() {
    // tslint:disable-next-line:no-console
    console.log("component will mount");
  },
  componentDidMount() {
    // tslint:disable-next-line:no-console
    console.log("component did mount");
  }
};

export default lifecycle<RouterProps, {}>(lifeCycleFunctions)(PlayerGameList);
