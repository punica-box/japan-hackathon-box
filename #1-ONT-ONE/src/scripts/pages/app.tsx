import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as dapi from '../actions/dapi';

class App extends React.Component<any, any> {

  constructor(props, state) {
    super(props, state);
    props.dispatch(dapi.init());
  }

  render() {
    return (
      <div className='index'>
        {this.renderContent()}
      </div>
    );
  }

  renderContent() {
    const { account } = this.props;

    if (!account) {
      return this.renderLogin();
    }

    return this.renderOptions();
  }

  renderLogin() {
    const { dispatch } = this.props;
    return (
      <div className='content-card'>
        <h2>{'Welcome to ONT-ONE!'}</h2>
        <h3>{'You one stop shop for asset creation.'}</h3>
        <div
          className='connect-container'
          onClick={() => dispatch(dapi.connect())}
        >
          <div className='connect-o3'/>
        </div>
      </div>
    );
  }

  renderOptions() {
    const { dispatch } = this.props;
    return (
      <div className='content-card'>
        <h1>{'Create a token'}</h1>
        <div className='button-container'>
          <button onClick={() => dispatch(push('/oep4'))}>OEP4</button>
          <button
            onClick={() => dispatch(push('/oep4crowdsale'))}
            className='last-button'
          >
            {'OEP4 w/ Crowdsale'}
          </button>
        </div>

        <h1>{'Manage token'}</h1>
        <div className='button-container'>
          <button
            onClick={() => dispatch(push('/mangecrowdsale'))}
            className='last-button'
          >
            {'Manage'}
          </button>
        </div>

        <h1>{'Buy tokens'}</h1>
        <div className='button-container'>
          <button
            onClick={() => dispatch(push('/buytokens'))}
            className='last-button'
          >
            {'Participate'}
          </button>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);
