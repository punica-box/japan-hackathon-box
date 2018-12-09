import { Crypto } from "ontology-ts-sdk";
import { client } from "ontology-dapi";

export function address2scriptHash(address: string) {
  const ad = new Crypto.Address(address);
  return ad.serialize();
}

interface Iinvoke {
  scriptHash: string;
  operation: string;
  args?: any[];
  gasPrice?: number;
  gasLimit?: number;
  requireIdentity?: boolean;
}

export async function onScCall(values: Iinvoke) {
  return new Promise<object>(async (resolve, reject) => {
    client.registerClient({});
    const { scriptHash, operation, gasPrice, gasLimit, requireIdentity, args } = values;

    console.log({ args });
    try {
      const result = await client.api.smartContract.invoke({
        scriptHash,
        operation,
        args,
        gasPrice,
        gasLimit,
        requireIdentity
      });
      console.log("onScCall finished, result:" + JSON.stringify(result));
      resolve(result);
    } catch (e) {
      console.log("onScCall error:", e);
      reject(e);
    }
  });
}

export async function onScCallRead(values: Iinvoke) {
  return new Promise<object>(async (resolve, reject) => {
    client.registerClient({});
    const { scriptHash, operation, args } = values;

    console.log({ args });
    try {
      const result = await client.api.smartContract.invokeRead({
        scriptHash,
        operation,
        args
      });
      console.log("onScCall finished, result:" + JSON.stringify(result));
      resolve(result);
    } catch (e) {
      console.log("onScCall error:", e);
      reject(e);
    }
  });
}
