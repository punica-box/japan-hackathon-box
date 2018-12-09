import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component from ".";
import { makeIlistBidPropsMock } from "../../../interface";

export const listBidStory = {
  listBid: makeIlistBidPropsMock().listBid
};

storiesOf("molecules", module).add("listBid", () => <Component {...listBidStory} />);
