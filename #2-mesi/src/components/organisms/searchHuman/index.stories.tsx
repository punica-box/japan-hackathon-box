import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component, { IsearchHumanOrgProps } from ".";

import { formSearchHumanStory } from "../../molecules/formSearchHuman/index.stories";
import { ListResultSearchHumanStory } from "../../molecules/listResultSearchHuman/index.stories";

export const searchHumanOrgStory: IsearchHumanOrgProps = {
  ...Object.assign({}, formSearchHumanStory, ListResultSearchHumanStory)
};

storiesOf("organisms", module).add("searchHUman", () => <Component {...searchHumanOrgStory} />);
