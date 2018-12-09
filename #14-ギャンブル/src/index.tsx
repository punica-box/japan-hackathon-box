import * as Ontology from "ontology-dapi";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

Ontology.client.registerClient({});
ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
