import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component, { IMarketTempProps } from ".";

import { makeHumanDataMock, makeIlistBidPropsMock } from "../../../interface";
import { action } from "@storybook/addon-actions";

export const marketStory: IMarketTempProps = {
  myAddress: "test",
  detailHuman: makeHumanDataMock(),
  listBid: makeIlistBidPropsMock().listBid,
  onformBitWorker: () => {
    action("action");
  }
};

storiesOf("templates", module).add("market", () => <Component {...marketStory} />);
