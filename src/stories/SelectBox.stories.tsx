import type {
  ComponentMeta,
  ComponentStoryObj,
} from "@storybook/react";
import { SelectBox } from "../components/Form/SelectBox";

export default {
  component: SelectBox,
} as ComponentMeta<typeof SelectBox>;

export const Default: ComponentStoryObj<typeof SelectBox> = {
  args: {
    label: "Default",
    selectedOption: { id: "1", name: "テスト1" },
    options: [
      { id: "1", name: "テスト1" },
      { id: "2", name: "テスト2" },
      { id: "3", name: "テスト3" },
      { id: "4", name: "テスト4" },
    ],
    fullWidth: false,
  },
  storyName: "デフォルト",
};
