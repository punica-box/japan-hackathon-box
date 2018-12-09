import * as React from "react";

import { storiesOf } from "@storybook/react";
import Component, { IlistWorkerProps } from ".";
import { makeHumanDatasMock } from "../../../interface";
import { action } from "@storybook/addon-actions";

export const listWorkerStory: IlistWorkerProps = {
  listWorkers: makeHumanDatasMock().datas,
  onViewWorker: action("action")
};

storiesOf("molecules", module).add("listWorkers", () => <Component {...listWorkerStory} />);
