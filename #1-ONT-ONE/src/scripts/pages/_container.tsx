import * as React from 'react';
import { connect } from 'react-redux';
import { disconnect } from '../actions/dapi';

class Container extends React.Component<any, any> {
  render() {
    return (
      <div className='app_content'>
        <div className='ont-one-logo'/>
        {this.renderAccount()}
        {this.props.children}
      </div>
    );
  }

  renderAccount() {
    const { account, dispatch } = this.props;

    if (!account) {
      return '';
    }

    return (
      <div className='account'>
        <div className='label'>{account.label}</div>
        <div className='address'>{account.address}</div>
        <div
          className='disconnect'
          onClick={() => dispatch(disconnect())}
        >{'disconnect'}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Container);
