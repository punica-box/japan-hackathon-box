import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component, { IviewScoutProps } from ".";
import { makeHumanDataMock } from "../../../interface";
import { action } from "@storybook/addon-actions";
// import { action } from "@storybook/addon-actions";

export const viewScoutStory: IviewScoutProps = {
  humanScout: makeHumanDataMock(),
  onViewScout: action("action")
};

storiesOf("atoms", module).add("viewComment", () => <Component {...viewScoutStory} />);
