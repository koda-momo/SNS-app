import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Button } from "../components/Button/Button";
import { action } from "@storybook/addon-actions";

export default {
  component: Button,
} as ComponentMeta<typeof Button>;

// 名前付きエクスポートはデフォルトでストーリーオブジェクトを表す
export const Default: ComponentStoryObj<typeof Button> = {
  args: {
    label: "Default",
    onClick: action("clicked!"),
  },
  storyName: "デフォルト",
};

export const SubButton: ComponentStoryObj<typeof Button> = {
  args: {
    label: "SubButton",
    backgroundColor: "#f6f0ea",
    color: "#622d18",
  },
  storyName: "サブボタン",
};

export const Small: ComponentStoryObj<typeof Button> = {
  args: {
    label: "Small",
    size: "sm",
  },
  storyName: "小さいボタン",
};

export const Large: ComponentStoryObj<typeof Button> = {
  args: {
    label: "Large",
    size: "lg",
  },
  storyName: "大きいボタン",
};

export const SubSmall: ComponentStoryObj<typeof Button> = {
  args: {
    label: "SubSmall",
    backgroundColor: "#f6f0ea",
    color: "#622d18",
    size: "sm",
  },
  storyName: "小さいサブボタン",
};
