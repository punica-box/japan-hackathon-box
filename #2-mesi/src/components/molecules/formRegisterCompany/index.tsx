import * as React from "react";
import { Button, FormControl, TextField } from "@material-ui/core";
import { Company } from "../../../interface";

export interface FormRegisterCompanyProps {
  addressRegisterCompany: string;
  registerCompany: (company: Company) => void;
}

export default class FormRegisterCompanyMol extends React.Component<FormRegisterCompanyProps, {}> {
  name: string = "";

  constructor(props: FormRegisterCompanyProps) {
    super(props);
  }

  public render() {
    const { registerCompany } = this.props;

    return (
      <div>
        <div
          style={{
            border: "1px solid",
            borderRadius: 4,
            borderWidth: 0.5,
            borderColor: "#d6d7da"
          }}
        >
          <FormControl margin="normal" required fullWidth>
            <div style={{ textAlign: "center" }}>
              <TextField
                label="name"
                style={{ width: "90%" }}
                onChange={e => {
                  this.name = e.target.value;
                }}
              />
            </div>
          </FormControl>
          <br />
          <br />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              const company: Company = {
                companyAddr: this.props.addressRegisterCompany,
                name: this.name
              };
              registerCompany(company);
            }}
          >
            Register
          </Button>
        </div>
      </div>
    );
  }
}
