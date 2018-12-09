import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component, { IformBitWorkerProps } from ".";
import { action } from "@storybook/addon-actions";

export const FormBitWorkerStory: IformBitWorkerProps = { onformBitWorker: action("openurl") };

storiesOf("molecules", module).add("formBitWorker", () => <Component {...FormBitWorkerStory} />);
