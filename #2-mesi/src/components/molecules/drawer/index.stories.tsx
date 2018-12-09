import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component, { IdrawerMolProps, IdrawerMolList } from ".";
import { action } from "@storybook/addon-actions";

export const makeIdrawerMolListMock = (
  payload: { [key in keyof IdrawerMolList]?: IdrawerMolList[key] } = {}
): IdrawerMolList => {
  return Object.assign(
    {},
    {
      address: "this is mock string",
      label: "this is mock string"
    },
    payload
  );
};

export const makeIdrawerMolPropsMock = (
  payload: { [key in keyof IdrawerMolProps]?: IdrawerMolProps[key] } = {}
): IdrawerMolProps => {
  return Object.assign(
    {},
    {
      drawerOpen: true,
      drawerMolClose: () => {
        action("close");
      },
      drawerMolList: new Array(3)
        .toString()
        .split(",")
        .map(() => Object.assign({}, makeIdrawerMolListMock())),
      history: undefined
    },
    payload
  );
};

storiesOf("molecules", module).add("drawer", () => (
  <Component {...makeIdrawerMolPropsMock()} />
));
