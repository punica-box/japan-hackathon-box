import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component from ".";
import { makeIdrawerMolPropsMock } from "../../molecules/drawer/index.stories";
import { searchHumanOrgStory } from "../../organisms/searchHuman/index.stories";
import { action } from "@storybook/addon-actions";

storiesOf("templates", module).add("scout", () => (
  <Component {...searchHumanOrgStory} myAddress="test" {...makeIdrawerMolPropsMock()} openAuction={action("")} />
));
