import * as React from "react";
import { connect } from "react-redux";
import { ReduxState } from "src/createStore";
import { Dispatch } from "redux";
import ResultTemp from "../../components/templates/result";
import { HumanData, ResultAuction } from "../../interface";
import { ContractState, finishAuction } from "../../modules/contract";
import { Snackbar } from "@material-ui/core";

interface Props extends ContractState {
  dispatch: Dispatch;
  history: any;
}

interface States {
  human?: HumanData;
  snackOpen: boolean;
  snackMessage: string;
}

class Result extends React.Component<Props, States> {
  constructor(props: any) {
    super(props);
    this.state = {
      human: undefined,
      snackOpen: false,
      snackMessage: ""
    };
  }

  onViewAuctionResult = (human: ResultAuction) => {
    console.log("onview");
    this.setState({ human: human.human });
  };

  onformResultApprove = () => {
    console.log("onformResultApprove", this.state.human);
    if (this.state.human) {
      finishAuction(this.state.human.address);
      this.setState({ snackMessage: "auction closed", snackOpen: true });
    }
  };

  render() {
    const { history, myAddress, listResultAuction } = this.props;
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
        <ResultTemp
          history={history}
          myAddress={myAddress ? myAddress : "error"}
          listResultAuction={listResultAuction}
          onViewAuctionResult={this.onViewAuctionResult}
          detailHuman={this.state.human}
          onformResultApprove={this.onformResultApprove}
        />
      </div>
    );
  }
}

export default connect((state: ReduxState) => Object.assign({}, state.contract))(Result);
