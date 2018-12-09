import * as React from "react";

import { storiesOf } from "@storybook/react";
import Component, { IlistResultAuctionProps } from ".";
import { action } from "@storybook/addon-actions";

export const listResultAuctionStory: IlistResultAuctionProps = {
  listResultAuction: [],
  onViewAuctionResult: action("action")
};

storiesOf("molecules", module).add("listResultAuction", () => <Component {...listResultAuctionStory} />);
