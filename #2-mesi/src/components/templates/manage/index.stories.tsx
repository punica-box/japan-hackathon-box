import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component, { ImangeTempProps } from ".";
import { manageLeftOrgStory } from "../../organisms/manageLeft/index.stories";
import { headerOrgStory } from "../../organisms/header/index.stories";
import { manageRightOrgStory } from "../../organisms/manageRight/index.stories";

export const manageTempStory: ImangeTempProps = {
  ...Object.assign({}, headerOrgStory, manageLeftOrgStory, manageRightOrgStory)
};

storiesOf("templates", module).add("manage", () => <Component {...manageTempStory} />);
