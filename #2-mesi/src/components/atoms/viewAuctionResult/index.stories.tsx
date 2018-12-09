import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component, { IviewAuctionResultProps } from ".";
import { action } from "@storybook/addon-actions";

export const viewAuctionResult: IviewAuctionResultProps = {
  onViewAuctionResult: action("action")
};

storiesOf("atoms", module).add("viewAuctionResult", () => <Component {...viewAuctionResult} />);
