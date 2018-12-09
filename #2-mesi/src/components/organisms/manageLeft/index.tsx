import * as React from "react";
import ListWorkerMol, { IlistWorkerProps } from "../../molecules/listWorkers";
import { Button, Modal } from "@material-ui/core";
import FormAddWorkerMol, { IformAddWorkerProps } from "../../molecules/formAddWorker";
import FormSetAddress, { IformSetAddressProps } from "../../molecules/formSetAddress";
import { Company } from "../../../interface";

export interface ImanageLeftOrgProps extends IlistWorkerProps, IformAddWorkerProps, IformSetAddressProps {
  companyInfo?: Company;
  style?: React.CSSProperties;
}

export interface ImanageLeftOrgStates {
  modalOpen: boolean;
}

export default class ManageLeftOrg extends React.Component<ImanageLeftOrgProps, ImanageLeftOrgStates> {
  constructor(props: ImanageLeftOrgProps) {
    super(props);
    this.state = { modalOpen: false };
  }

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  handleModalOpen = () => {
    this.setState({ modalOpen: true });
  };

  public render() {
    const { companyInfo } = this.props;
    return (
      <div style={this.props.style}>
        株式会社 {companyInfo ? companyInfo.name : "未選択"}
        <div style={{ display: "flex", minHeight: "90vh", flexDirection: "column" }}>
          <div style={{ flex: 1 }}>
            <FormSetAddress {...this.props} />
            <ListWorkerMol {...this.props} />
          </div>
          <Button onClick={this.handleModalOpen} style={{ marginTop: "auto" }}>
            社員を加える
          </Button>
        </div>
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
            <FormAddWorkerMol
              {...this.props}
              onformAddWorker={v => {
                this.props.onformAddWorker(v);
                this.handleModalClose();
              }}
            />
          </div>
        </Modal>
      </div>
    );
  }
}
