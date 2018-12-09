import * as React from "react";
import { connect } from "react-redux";
import { ReduxState } from "src/createStore";
import { Dispatch } from "redux";
import MarketTemp from "../../components/templates/market";
import { drawerList } from "./const";
import {
  ContractState,
  existAuction,
  registerAuction,
  registerBid,
  listenBid,
  listenCloseAuction
} from "../../modules/contract";
import { Snackbar } from "@material-ui/core";

interface Props extends ContractState {
  dispatch: Dispatch;
  history: any;
}

interface States {
  snackOpen: boolean;
  snackMessage: string;
}

class Market extends React.Component<Props, States> {
  constructor(props: any) {
    super(props);
    this.state = { snackOpen: false, snackMessage: "" };
    this.init();
  }

  async init() {
    const { detailHuman } = this.props;
    if (detailHuman) {
      const result = await existAuction(detailHuman.address);
      if (!result) {
        const success = await registerAuction(detailHuman.address);
        if (success) {
          await this.listen(detailHuman.address);
        }
      } else {
        await this.listen(detailHuman.address);
      }
    }
  }

  async listen(address: string) {
    const interval = await listenBid(address, this.props.dispatch);
    listenCloseAuction(address, this.props.dispatch, () => {
      if (interval) clearInterval(interval);
      this.setState({ snackMessage: "auction closed", snackOpen: true });
    });
  }

  onformBitWorker = async (num: number) => {
    const { detailHuman, myAddress } = this.props;
    if (!detailHuman || !myAddress) return;
    await registerBid(detailHuman.address, myAddress, num);
  };

  render() {
    const { history, myAddress, detailHuman, listBid } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={this.state.snackOpen}
          onClose={() => {
            this.setState({ snackOpen: false });
          }}
          message={this.state.snackMessage}
        />
        <MarketTemp
          history={history}
          myAddress={myAddress ? myAddress : "error"}
          drawerMolList={drawerList}
          detailHuman={detailHuman}
          listBid={listBid}
          onformBitWorker={this.onformBitWorker}
        />
      </div>
    );
  }
}

export default connect((state: ReduxState) => Object.assign({}, state.contract))(Market);
