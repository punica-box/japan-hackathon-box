import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component, { IviewBidProps } from ".";
import { makeIbidMock } from "../../../interface";

export const viewBidStory: IviewBidProps = {
  viewBid: makeIbidMock()
};

storiesOf("atoms", module).add("viewBid", () => <Component {...viewBidStory} />);
