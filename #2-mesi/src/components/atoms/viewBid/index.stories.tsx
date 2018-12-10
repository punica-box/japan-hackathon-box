import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component, { IviewBidProps } from ".";

export const viewBidStory: IviewBidProps = {
  viewBid: { personAddr: "aaa", price: 1111, companyAddr: "aaaabb", now: "21808901" }
};

storiesOf("atoms", module).add("viewBid", () => <Component {...viewBidStory} />);
