import * as React from "react";
import { RouterProps } from "react-router";

export const Top: React.SFC<RouterProps> = props => {
  function bePlayer() {
    props.history.push("/player-gamelist");
  }

  function beDealer() {
    props.history.push("/deal-list");
  }

  return (
    <div>
      <button onClick={bePlayer}>bePlayer</button>
      <hr />
      <button onClick={beDealer}>beDealer</button>
      <hr />
    </div>
  );
};
