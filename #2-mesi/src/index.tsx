import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createStore from "./createStore";
import { HashRouter as Router, Route } from "react-router-dom";
import * as Ontology from "ontology-dapi";
import scout from "./containers/pages/scout";
import manage from "./containers/pages/manage";
import market from "./containers/pages/market";
import result from "./containers/pages/result";
import { setMyAddress } from "./modules/contract";

const data = createStore();
Ontology.client.registerClient({});

(async () => {
  try {
    await Ontology.client.api.provider.getProvider();
  } catch (e) {
    alert("No dAPI provider istalled.");
  }
})();

console.log({ data });

setMyAddress(data.store.dispatch);

ReactDOM.render(
  <Provider store={data.store}>
    <Router>
      <div>
        <Route exact path="/" component={manage} />
        <Route path="/scout" component={scout} />
        <Route path="/market" component={market} />
        <Route path="/result" component={result} />
      </div>
    </Router>
  </Provider>,
  document.getElementById("root") as HTMLElement
);
