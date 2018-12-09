import {
  UPDATE_NETWORKS,
  UPDATE_PENDING_CONTRACT_DETAILS,
  UPDATE_COMPILED_CONTRACT,
  UPDATE_PENDING_CONTRACT_DEPLOY,
  UPDATE_DEPLOYED_CONTRACT,
  UPDATE_ACCOUNT,
  DISCONNECT,
  RESET,
} from '../constants/actions';
import o3dapi from 'o3-dapi-core';
import o3dapiOnt from 'o3-dapi-ont';
import $ from 'jquery';
import { Crypto } from 'ontology-ts-sdk';
import { replace } from 'react-router-redux';

export function init() {
  return dispatch => {
    o3dapi.initPlugins([o3dapiOnt]);
    o3dapi.ONT.addEventListener(o3dapi.ONT.Constants.EventName.READY, () => {
      o3dapi.ONT.getNetworks()
      .then(networks => {
        dispatch({
          type: UPDATE_NETWORKS,
          data: networks,
        });
      });
    });
  };
}

export function connect() {
  return dispatch => {
    o3dapi.ONT.getAccount()
    .then(account => {
      dispatch({
        type: UPDATE_ACCOUNT,
        data: account,
      });
    })
    .catch(err => {})
  }
}

export function disconnect() {
  return dispatch => {
    o3dapi.ONT.disconnect()
    .then(res => {
      dispatch({
        type: DISCONNECT,
      });
      dispatch(replace('/'));
    })
    .catch(err => {})
  }
}

export function reset() {
  return dispatch => {
    dispatch(replace('/'));
    dispatch({type: RESET});
  };
}

export function compile(code) {
  return dispatch => {
    const url = 'https://smartxcompiler.ont.io/api/beta/python/compile';

    const payload = {
      type : 'Python',
      code,
    };

    $.ajax({
      url: url,
      method: 'POST',
      data: JSON.stringify(payload),
    })
    .then(res => {
      if (typeof (res) === 'string') {
        res = JSON.parse(res);
      }
      let { avm, errcode, abi, errdetail, debug, opcode, funcmap } = res;
      let contractHash = '';
      if (avm && abi) {
        avm = cleanData(avm);
        abi = cleanAndFormatAbi(cleanData(abi));
        contractHash = Crypto.Address.fromVmCode(avm).toHexString();
      }
      if (debug) {
        debug = JSON.parse(debug);
      }
      if (funcmap) {
        funcmap = JSON.parse(funcmap);
      }
      const info = {
        avm,
        abi,
        contractHash,
        debug,
        opcode,
        funcmap,
        showCompileInfo: true,
        errdetail : errdetail,
      };

      dispatch({
        type: UPDATE_COMPILED_CONTRACT,
        data: info,
      });
    }).catch(err => {});
  };
}

export function deploy({
  contractName,
  version,
  author,
  email,
  description,
  network,
}) {
  return (dispatch, getState) => {
    const { dapi } = getState();
    const { compileDetails } = dapi;
    const { avm, contractHash } = compileDetails;

    dispatch({
      type: UPDATE_PENDING_CONTRACT_DEPLOY,
      data: {
        contractHash,
        contractName,
        version,
        author,
        email,
        description,
        network,
      },
    });

    o3dapi.ONT.sc.deploy({
      name: contractName,
      version,
      author,
      email,
      description,
      code: avm,
      network,
      gasLimit: 21000000,
      gasPrice: 500,
    })
    .then(res => {
      dispatch({
        type: UPDATE_DEPLOYED_CONTRACT,
        data: {
          ...res,
          contractHash,
          network,
        },
      });
    })
    .catch(err => {});
  };
}

function cleanData(data) {
  if (data && data.substr(0, 2) === `b'` && data.substr(-1, 1) === `'`) {
    data = data.substring(2, data.length - 1);
  }
  return data;
}

function cleanAndFormatAbi(abi) {
  let result;
  while (abi && abi.indexOf('\\n') >= 0) {
    abi = abi.replace('\\n', '');
    try {
      result = JSON.parse(abi);
    } catch (err) {
      result = {};
    }
  }
  return result;
}
