import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component from ".";
import { action } from "@storybook/addon-actions";

export const formSearchHumanStory = { onformSearchHuman: action("openurl") };

storiesOf("molecules", module).add("formSearchHuman", () => <Component {...formSearchHumanStory} />);
