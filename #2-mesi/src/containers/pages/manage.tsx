import * as React from "react";
import { connect } from "react-redux";
import { ReduxState } from "src/createStore";
import { Dispatch } from "redux";
import ManageTemp from "../../components/templates/manage";
import {
  ContractState,
  existCompany,
  registerCompany,
  listenCompanyPerson,
  registerCompanyPerson
} from "../../modules/contract";
import { HumanData, Company } from "../../interface";
import { Modal } from "@material-ui/core";
import FormRegisterCompanyMol from "../../components/molecules/formRegisterCompany";

interface Props extends ContractState {
  dispatch: Dispatch;
  history: any;
}

interface States {
  detailHuman?: HumanData;
  modalOpen: boolean;
}

class Manage extends React.Component<Props, States> {
  constructor(props: any) {
    super(props);
    this.state = {
      detailHuman: undefined,
      modalOpen: false
    };
  }

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  handleModalOpen = async () => {
    this.setState({ modalOpen: true });
  };

  onformAddWorker = async (human: HumanData) => {
    console.log("add", human);
    const { companyInfo } = this.props;
    if (!companyInfo) return;
    human.company = companyInfo.name;
    await registerCompanyPerson(human.address, companyInfo.companyAddr);
  };

  addressRegisterCompany = "";
  onformSetAddress = async (address: string) => {
    const result = await existCompany(address, this.props.dispatch);
    if (result) {
      listenCompanyPerson({ companyAddr: address, name: result }, this.props.dispatch);
    } else {
      this.addressRegisterCompany = address;
      this.handleModalOpen();
    }
  };

  onViewWorker = (human: HumanData) => {
    this.setState({ detailHuman: human });
  };

  onRegisterCompany = async (company: Company) => {
    const result = await registerCompany(company, this.props.dispatch);
    if (result) {
      listenCompanyPerson(company, this.props.dispatch);
    }
    this.handleModalClose();
  };

  render() {
    const { history, listWorkers, myAddress, companyInfo } = this.props;
    return (
      <div>
        <ManageTemp
          history={history}
          companyInfo={companyInfo}
          myAddress={myAddress ? myAddress : "error"}
          listWorkers={listWorkers}
          onformAddWorker={this.onformAddWorker}
          onformSetAddress={this.onformSetAddress}
          onViewWorker={this.onViewWorker}
          detailHuman={this.state.detailHuman}
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
            <FormRegisterCompanyMol
              addressRegisterCompany={this.addressRegisterCompany}
              registerCompany={this.onRegisterCompany}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

export default connect((state: ReduxState) => Object.assign({}, state.contract))(Manage);
