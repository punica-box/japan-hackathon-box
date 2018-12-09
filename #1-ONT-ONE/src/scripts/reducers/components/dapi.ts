import {
  UPDATE_NETWORKS,
  UPDATE_PENDING_CONTRACT_DETAILS,
  UPDATE_COMPILED_CONTRACT,
  UPDATE_PENDING_CONTRACT_DEPLOY,
  UPDATE_DEPLOYED_CONTRACT,
  DISCONNECT,
  RESET,
} from '../../constants/actions';

const initialState = {
  networks: [],
  pendingCompileDetails: null,
  compileDetails: null,
  pendingDeployDetails: null,
  deployDetails: null,
};

export default function dapi(state = initialState, action) {
  switch (action.type) {
    case RESET:
    case DISCONNECT:
      return {
        ...initialState,
        networks: state.networks,
      };
    case UPDATE_NETWORKS:
      return {
        ...state,
        networks: action.data,
      };
    case UPDATE_PENDING_CONTRACT_DETAILS:
      return {
        ...state,
        pendingCompileDetails: action.data,
      };
    case UPDATE_COMPILED_CONTRACT:
      return {
        ...state,
        compileDetails: action.data,
      };
    case UPDATE_PENDING_CONTRACT_DEPLOY:
      return {
        ...state,
        pendingDeployDetails: action.data,
      };
    case UPDATE_DEPLOYED_CONTRACT:
      return {
        ...state,
        deployDetails: action.data,
      };
    default:
      return state;
  }
}
