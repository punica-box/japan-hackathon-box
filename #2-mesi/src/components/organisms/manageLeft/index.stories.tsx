import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component, { ImanageLeftOrgProps } from ".";
import { listWorkerStory } from "../../molecules/listWorkers/index.stories";
import { formAddWorkerStory } from "../../molecules/formAddWorker/index.stories";
import { formSetAddressStory } from "../../molecules/formSetAddress/index.stories";

export const manageLeftOrgStory: ImanageLeftOrgProps = {
  ...Object.assign({}, listWorkerStory, formAddWorkerStory, formSetAddressStory)
};

storiesOf("organisms", module).add("manageLeft", () => <Component {...manageLeftOrgStory} />);
