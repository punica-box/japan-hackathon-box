import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component from ".";
import { action } from "@storybook/addon-actions";

export const formAddWorkerStory = { onformAddWorker: action("openurl") };

storiesOf("molecules", module).add("formAddworker", () => <Component {...formAddWorkerStory} />);
