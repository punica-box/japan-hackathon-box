import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component from ".";
import { detailWorkerStory } from "../../molecules/detailWorker/index.stories";

export const manageRightOrgStory = {
  ...detailWorkerStory
};

storiesOf("organisms", module).add("manageRight", () => <Component {...manageRightOrgStory} />);
