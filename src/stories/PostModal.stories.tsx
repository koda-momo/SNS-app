import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { PostModal } from "../components/Modal/PostModal";

export default {
  title: "PostModal",
  component: PostModal,
} as ComponentMeta<typeof PostModal>;

const Template: ComponentStory<typeof PostModal> = (args) => <PostModal {...args} />;

export const Default: ComponentStory<typeof PostModal> = Template.bind({});

Default.args = {
  isOpen: true,
  closeModal: () => {
    alert("モーダルを閉じる");
  },
  title: "つぶやき",
  success: () => {
    alert("成功しました");
  },
};
Default.storyName = "デフォルト";

export const Timeline: ComponentStory<typeof PostModal> = Template.bind({});
Timeline.args = {
  isOpen: true,
  closeModal: () => {
    alert("モーダルを閉じる");
  },
  title: "つぶやき",
  success: () => {
    alert("呟きました");
  },
};
