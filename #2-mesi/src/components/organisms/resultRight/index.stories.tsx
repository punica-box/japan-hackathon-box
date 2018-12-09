import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component, { IresultRightOrgProps } from ".";
import { detailWorkerStory } from "../../molecules/detailWorker/index.stories";
import { FormResultApproveStory } from "../../molecules/formResultApprove/index.stories";

export const resultRightOrgStory: IresultRightOrgProps = {
  ...Object.assign({}, detailWorkerStory, FormResultApproveStory)
};

storiesOf("organisms", module).add("manageRight", () => <Component {...resultRightOrgStory} />);
