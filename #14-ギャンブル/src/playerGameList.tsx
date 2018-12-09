import { client, ParameterType } from "ontology-dapi";
import * as React from "react";
import { RouterProps } from "react-router";
import {
  compose,
  lifecycle,
  StateHandler,
  StateHandlerMap,
  withHandlers,
  withStateHandlers
} from "recompose";

// tslint:disable-next-line:interface-over-type-literal
type Outter = {}; // ここから外側のプロパティを注入できる。

// tslint:disable-next-line:interface-over-type-literal
type Body = {
  // 非同期処理の結果の肩
  [key: string]: string;
};

// tslint:disable-next-line:interface-over-type-literal
type State = {
  data: Body;
};

// tslint:disable-next-line:interface-over-type-literal
// tslint:disable-next-line:interface-name
interface StateUpdaters extends StateHandlerMap<State> {
  recieveData: StateHandler<State>;
}

// tslint:disable-next-line:interface-over-type-literal
type Handlers = {
  fetchData: () => Promise<void>;
};

type Props = Outter & State & StateUpdaters & Handlers & RouterProps;

const PlayerGameList: React.SFC<Props> = props => {
  function playChinchiro() {
    props.history.push("/play-chinchiro");
  }

  return (
    <div>
      <button onClick={playChinchiro}>playChinchiro</button>
    </div>
  );
};

export default compose<Props, Outter>(
  withStateHandlers<State, StateUpdaters, Outter>(
    { data: {} },
    {
      recieveData: (_: State) => (body: Body) => ({ data: body })
    }
  ),
  withHandlers<Props, Handlers>({
    // fetchData: props => myClient.getPlayerGameList
    fetchData: props => async () => {
      const scriptHash: string = "9ac31af78ba407a149a52589b3f1e3e999dc90bd";
      const operation: string = "GetLatestRoomID";
      const parametersRaw: any[] = [{ type: "Integer", value: "5" }];
      const args = parametersRaw.map(raw => ({
        type: raw.type,
        value: convertValue(raw.value, raw.type)
      }));

      try {
        const result = await client.api.smartContract.invokeRead({
          scriptHash,
          // tslint:disable-next-line:object-literal-sort-keys
          operation,
          args
        });
        // tslint:disable-next-line:no-console
        console.log(
          "getPlayerGameList finished, result:" + JSON.stringify(result)
        );
      } catch (e) {
        alert("getPlayerGameList canceled");
        // tslint:disable-next-line:no-console
        console.log("getPlayerGameList error:", e);
      }
    }
  }),
  lifecycle<Props, {}>({
    componentWillMount() {
      this.props.fetchData();
      // tslint:disable-next-line:no-console
      console.log("component will mount");
    },
    componentDidMount() {
      // tslint:disable-next-line:no-console
      console.log("component did mount");
    }
  })
)(PlayerGameList);

function convertValue(value: string, type: ParameterType): any {
  switch (type) {
    case "Boolean":
      return Boolean(value);
    case "Integer":
      return Number(value);
    case "ByteArray":
      return value;
    case "String":
      return String(value);
  }
}

// export default lifecycle<RouterProps, {}>(lifeCycleFunctions)(PlayerGameList);
