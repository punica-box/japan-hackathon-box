import * as React from 'react';
import { connect } from 'react-redux';
import { deploy } from '../../actions/dapi';
import Loading from '../Loading';

interface Props {
  dispatch: any;
  compileDetails: any;
  networks: string[];
}

interface State {
  networkIndex: number;
  error: string;
  isLoading: boolean;
}

const initialState = {
  networkIndex: 0,
  error: null,
  isLoading: false,
};

export default class Deploy extends React.Component<Props, State> {

  private nameEle;
  private versionEle;
  private authorEle;
  private emailEle;
  private descriptionEle;

  constructor(props, state) {
    super(props, state);
    this.state = {
      ...initialState,
      networkIndex: (props.networks.length - 1) || initialState.networkIndex,
    };
  }

  render() {
    const { networks, compileDetails } = this.props;
    const { networkIndex, error, isLoading } = this.state;
    const {
      tokenName,
      symbol,
      decimals,
      totalSupply,
      owner,
    } = compileDetails;

    return (
      <div className='token-details-confirmation'>
        <h1>{'New Token Confirmation'}</h1>
        <div className='counterButtons'>

          <div>
            <div className='row'>{`Token name: ${tokenName}`}</div>
            <div className='row'>{`Token symbol: ${symbol}`}</div>
            <div className='row'>{`Token decimals: ${decimals}`}</div>
            <div className='row'>{`Token total supply: ${totalSupply}`}</div>
            <div className='row'>{`Owner address: ${owner}`}</div>
          </div>

          <div className='row'>
            <div className='description'>{'Contract name:'}</div>
            <input
              ref={ref => this.nameEle = ref}
              placeholder='eg. Sausage Coin Contract'
              defaultValue='Sausage Coin Contract'
            />
          </div>

          <div className='row'>
            <div className='description'>{'version:'}</div>
            <input
              ref={ref => this.versionEle = ref}
              placeholder='eg. v0.0.1'
              defaultValue='v0.0.1'
            />
          </div>

          <div className='row'>
            <div className='description'>{'author:'}</div>
            <input
              ref={ref => this.authorEle = ref}
              placeholder='eg. John Smith'
              defaultValue='John Smith'
            />
          </div>

          <div className='row'>
            <div className='description'>{'email:'}</div>
            <input
              ref={ref => this.emailEle = ref}
              placeholder='eg. johnsmith@gmail.com'
              defaultValue='johnsmith@gmail.com'
            />
          </div>

          <div className='row'>
            <div className='description'>{'description:'}</div>
            <input
              ref={ref => this.descriptionEle = ref}
              placeholder='eg. A token contract for Sausage Chain project.'
              defaultValue='A token contract for Sausage Chain project.'
            />
          </div>

          <select
            value={networkIndex}
            onChange={event => this.setState({networkIndex: Number(event.target.value)})}
          >
            {networks.map((network, index) => (
              <option
                key={network + index}
                value={index}
              >
                {network}
              </option>
            ))}
          </select>

          {error ? (
            <div className='error' >{error}</div>
          ) : ''}

          {isLoading ? (
            <Loading />
          ) : (
            <div
              className='submit-button'
              onClick={() => this.handleSubmit()}
            >
              {'Deploy'}
            </div>
          )}

        </div>
      </div>
    );
  }

  handleSubmit() {
    const { dispatch, networks } = this.props;
    const { networkIndex, error } = this.state;

    if (!this.nameEle.value) {
      this.setState({error: 'Name is blank!'});
      return;
    }

    if (!this.versionEle.value) {
      this.setState({error: 'Version is blank!'});
      return;
    }

    if (!this.authorEle.value) {
      this.setState({error: 'Author is blank!'});
      return;
    }

    if (!this.emailEle.value) {
      this.setState({error: 'Email is blank!'});
      return;
    }

    if (!this.descriptionEle.value) {
      this.setState({error: 'Description is blank!'});
      return;
    }

    this.setState({isLoading: true});
    dispatch(deploy({
      contractName: this.nameEle.value,
      version: this.versionEle.value,
      author: this.authorEle.value,
      email: this.emailEle.value,
      description: this.descriptionEle.value,
      network: networks[networkIndex],
    }));
  }
}
