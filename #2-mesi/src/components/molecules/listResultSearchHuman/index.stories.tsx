import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component, { IlistResultSearchHumanProps } from ".";
import { viewScoutStory } from "../../atoms/viewScout/index.stories";

export const ListResultSearchHumanStory: IlistResultSearchHumanProps = {
  listResultSearchHumans: [],
  onViewScout: viewScoutStory.onViewScout
};

storiesOf("molecules", module).add("listResultSearchHuman", () => <Component {...ListResultSearchHumanStory} />);
