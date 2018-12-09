import * as React from "react";
import { RouterProps } from "react-router";

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
