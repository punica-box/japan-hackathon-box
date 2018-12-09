import * as React from 'react';
import { connect } from 'react-redux';
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
}

const initialState = {
};

class BuyTokens extends React.Component<Props, State> {

  render() {
    const { dispatch } = this.props;
    return (
      <div className='content-card'>
        <h1>{'Buy tokens'}</h1>
        <div className='counterButtons'>

          <div className='row center'>
            {'Under construction'}
          </div>

          <div
            className='submit-button'
            onClick={() => dispatch(reset())}
          >
            {'Done'}
          </div>

        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let {
    dapi,
  } = state;

  return {
    networks: dapi.networks,
  };
}

export default connect(mapStateToProps)(BuyTokens);
