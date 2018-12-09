import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component, { IviewWorkerProps } from ".";
import { makeHumanDataMock } from "../../../interface";
import { action } from "@storybook/addon-actions";

export const viewWorker: IviewWorkerProps = {
  resultHuman: makeHumanDataMock(),
  onViewWorker: action("action")
};

storiesOf("atoms", module).add("viewWorker", () => <Component {...viewWorker} />);
