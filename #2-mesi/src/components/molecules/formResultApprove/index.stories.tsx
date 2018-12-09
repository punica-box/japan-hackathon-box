import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component, { IformResultApproveProps } from ".";
import { action } from "@storybook/addon-actions";

export const FormResultApproveStory: IformResultApproveProps = { onformResultApprove: action("openurl") };

storiesOf("molecules", module).add("formResultApprove", () => <Component {...FormResultApproveStory} />);
