import * as React from 'react';
import { connect } from 'react-redux';
import { init, compile, deploy } from '../actions/dapi';
import Compile from '../components/oep4/Compile';
import Deploy from '../components/oep4/Deploy';
import Receipt from '../components/oep4/Receipt';
import { reset } from '../actions/dapi';

interface Props {
  dispatch: any;
  networks: string[];
  pendingCompileDetails: any;
  compileDetails: any;
  pendingDeployDetails: any;
  deployDetails: any;
}

interface State {
  networkIndex: number;
  error: string;
}

const initialState = {
  networkIndex: 0,
  error: null,
};

class OEP4Token extends React.Component<Props, State> {

  constructor(props, state) {
    super(props, state);
    this.state = {
      ...initialState,
      networkIndex: props.networks.length || initialState.networkIndex,
    };
  }

  render() {
    const { dispatch } = this.props;
    return (
      <div className='oep4-token content-card'>
        <div
          className='submit-button back'
          onClick={() => dispatch(reset())}
        >
          {'back'}
        </div>
        {this.renderContent()}
      </div>
    );
  }

  renderContent() {
    const {
      dispatch,
      networks,
      compileDetails,
      pendingCompileDetails,
      deployDetails,
    } = this.props;

    if (deployDetails) {
      return (
        <Receipt
          dispatch={dispatch}
          compileDetails={pendingCompileDetails}
          deployDetails={deployDetails}
        />
      );
    }

    if (compileDetails) {
      return (
        <Deploy
          dispatch={dispatch}
          compileDetails={pendingCompileDetails}
          networks={networks}
        />
      );
    }

    return (
      <Compile
        dispatch={dispatch}
      />
    );
  }
}

function mapStateToProps(state) {
  let {
    dapi,
  } = state;

  return {
    networks: dapi.networks,
    pendingCompileDetails: dapi.pendingCompileDetails,
    compileDetails: dapi.compileDetails,
    pendingDeployDetails: dapi.pendingDeployDetails,
    deployDetails: dapi.deployDetails,
  };
}

export default connect(mapStateToProps)(OEP4Token);
