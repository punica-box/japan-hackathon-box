import { client, ParameterType } from "ontology-dapi";

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

export async function getPlayerGameList() {
  // TODO: 本来のコントラクトアドレスと関数名に変更する
  const scriptHash: string = "39f3fb644842c808828817bd73da0946d99f237f";
  const operation: string = "Hello";
  const parametersRaw: any[] = [];
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
    console.log("getPlayerGameList finished, result:" + JSON.stringify(result));
  } catch (e) {
    alert("getPlayerGameList canceled");
    // tslint:disable-next-line:no-console
    console.log("getPlayerGameList error:", e);
  }
}
