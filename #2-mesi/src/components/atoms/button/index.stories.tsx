import * as React from "react";

import { storiesOf } from "@storybook/react";

import TestButton from ".";
import { action } from "@storybook/addon-actions";

storiesOf("atoms", module).add("button", () => (
  <TestButton onClick={action("story")} />
));
