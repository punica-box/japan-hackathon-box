import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component, { IResultTempProps } from ".";
import { headerOrgStory } from "../../organisms/header/index.stories";
import { listResultAuctionStory } from "../../molecules/listResultAuction/index.stories";
import { detailWorkerStory } from "../../molecules/detailWorker/index.stories";
import { FormResultApproveStory } from "../../molecules/formResultApprove/index.stories";

export const resultStory: IResultTempProps = {
  ...Object.assign({}, headerOrgStory, listResultAuctionStory, detailWorkerStory, FormResultApproveStory)
};

storiesOf("templates", module).add("result", () => <Component {...resultStory} />);
