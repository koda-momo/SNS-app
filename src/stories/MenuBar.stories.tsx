import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { MenuBar } from "../components/Layout/MenuBar";

export default {
  title: "MenuBar",
  component: MenuBar,
} as ComponentMeta<typeof MenuBar>;

const Template: ComponentStory<typeof MenuBar> = (args) => <MenuBar {...args} />;

export const Default: ComponentStory<typeof MenuBar> = Template.bind({});
Default.storyName = "デフォルト";
