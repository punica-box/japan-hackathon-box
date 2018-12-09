import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component from ".";
import { action } from "@storybook/addon-actions";

export const formSetAddressStory = {
  onformSetAddress: action("formSetAddress")
};

storiesOf("molecules", module).add("formSetAddress", () => <Component {...formSetAddressStory} />);
