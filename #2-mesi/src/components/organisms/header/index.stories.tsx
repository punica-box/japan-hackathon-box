import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component, { IheaderOrgProps } from ".";
import { makeIdrawerMolPropsMock } from "../../molecules/drawer/index.stories";
// import { action } from "@storybook/addon-actions";

export const headerOrgStory: IheaderOrgProps = {
  ...makeIdrawerMolPropsMock(),
  myAddress: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
};

storiesOf("organisms", module).add("header", () => <Component {...headerOrgStory} />);
