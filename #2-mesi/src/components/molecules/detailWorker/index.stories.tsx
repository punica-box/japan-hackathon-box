import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component, { IdetailWorkerProps } from ".";
import { makeHumanDataMock } from "../../../interface";

export const detailWorkerStory:IdetailWorkerProps = {
  detailHuman: makeHumanDataMock()
};

storiesOf("molecules", module).add("detailWorker", () => <Component {...detailWorkerStory} />);
