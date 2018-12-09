import * as React from "react";
import { connect } from "react-redux";
import { ReduxState } from "src/createStore";
import { Dispatch } from "redux";
import ScoutTemp from "../../components/templates/scout";
import {
  ContractState,
  setContractValue,
  EcontractValue,
  existPerson,
  registerPerson,
  listenAllPersons
} from "../../modules/contract";
import { HumanData } from "../../interface";
import { Modal } from "@material-ui/core";
import FormRegisterMol from "../../components/molecules/register";

interface Props extends ContractState {
  dispatch: Dispatch;
  history: any;
}

interface States {
  modalOpen: boolean;
  detailHuman?: HumanData;
}

class Scout extends React.Component<Props, States> {
  constructor(props: any) {
    super(props);
    this.state = { modalOpen: false };
    this.init();
  }

  async init() {
    const result = await existPerson();
    console.log({ result });
    if (!result) {
      this.handleModalOpen();
    }
    listenAllPersons(this.props.dispatch);
  }

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  handleModalOpen = () => {
    this.setState({ modalOpen: true });
  };

  onViewScout = (human: HumanData) => {
    this.setState({ detailHuman: human });
  };

  openAuction = () => {
    setContractValue(EcontractValue.detailHuman, this.state.detailHuman, this.props.dispatch);
    this.props.history.push("/market");
  };

  onRegister = async (human: HumanData) => {
    await registerPerson(human);
    this.handleModalClose();
  };

  render() {
    const { history, myAddress, listResultSearchHumans } = this.props;
    return (
      <div>
        <ScoutTemp
          myAddress={myAddress ? myAddress : "error"}
          history={history}
          listResultSearchHumans={listResultSearchHumans}
          onViewScout={this.onViewScout}
          detailHuman={this.state.detailHuman}
          openAuction={this.openAuction}
        />
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.modalOpen}
          onClose={this.handleModalClose}
          style={{ display: "flex" }}
        >
          <div
            style={{
              width: "60%",
              height: "auto",
              flex: "0 1 auto",
              margin: "auto",
              background: "white"
            }}
          >
            <FormRegisterMol addressRegister={myAddress ? myAddress : "error"} register={this.onRegister} />
          </div>
        </Modal>
      </div>
    );
  }
}

export default connect((state: ReduxState) => Object.assign({}, state.contract))(Scout);
