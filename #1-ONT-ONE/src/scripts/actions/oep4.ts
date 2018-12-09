import {
  UPDATE_PENDING_CONTRACT_DETAILS,
} from '../constants/actions';
import { createOep4 } from '../utils/oep4';
import * as dapi from './dapi';

export function compile({
  tokenName,
  symbol,
  decimals,
  totalSupply,
  owner,
}) {
  return dispatch => {
    dispatch({
      type: UPDATE_PENDING_CONTRACT_DETAILS,
      data: {
        tokenName,
        symbol,
        decimals,
        totalSupply,
        owner,
      },
    });

    const code = createOep4({
      tokenName,
      symbol,
      decimals,
      totalSupply,
      owner,
    });

    dispatch(dapi.compile(code));
  };
}
