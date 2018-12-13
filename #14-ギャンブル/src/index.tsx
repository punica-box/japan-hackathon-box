import * as Ontology from "ontology-dapi";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import playerGameList from "./playerGameList";
import { Top } from "./top";

import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

const App: React.SFC<{}> = () => (
  <Router>
    <>
      <Route path="/" exact={true} component={Top} />
      <Route path="/player-gamelist" exact={true} component={playerGameList} />
    </>
  </Router>
);

Ontology.client.registerClient({});
ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
