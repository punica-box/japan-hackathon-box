import {
  UPDATE_PENDING_CONTRACT_DETAILS,
} from '../constants/actions';
import { createOep4Crowdsale } from '../utils/oep4Crowdsale';
import * as dapi from './dapi';

export function compile({
  tokenName,
  symbol,
  decimals,
  totalSupply,
  owner,
  initialAmount,
  tokensPerOnt,
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
        initialAmount,
        tokensPerOnt,
      },
    });

    const code = createOep4Crowdsale({
      tokenName,
      symbol,
      decimals,
      totalSupply,
      owner,
      initialAmount,
      tokensPerOnt,
    });

    dispatch(dapi.compile(code));
  };
}
