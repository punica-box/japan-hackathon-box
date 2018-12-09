import * as React from "react";
import { Button, FormControl, TextField } from "@material-ui/core";
import { HumanData } from "../../../interface";

export interface FormRegisterProps {
  addressRegister: string;
  register: (human: HumanData) => void;
}

export default class FormRegisterMol extends React.Component<FormRegisterProps, {}> {
  name: string = "";
  company: string = "";
  constructor(props: FormRegisterProps) {
    super(props);
    console.log({ props });
  }

  public render() {
    const { register } = this.props;

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
              <TextField
                label="company"
                style={{ width: "90%" }}
                onChange={e => {
                  this.company = e.target.value;
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
              const human: HumanData = {
                address: this.props.addressRegister,
                name: this.name,
                company: this.company
              };
              register(human);
            }}
          >
            Sign Up
          </Button>
        </div>
      </div>
    );
  }
}
