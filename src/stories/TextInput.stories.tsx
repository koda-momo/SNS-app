import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";
import { TextInput } from "../components/Form/TextInput";

export default {
  component: TextInput,
} as ComponentMeta<typeof TextInput>;

export const Default: ComponentStoryObj<typeof TextInput> = {
  args: {
    label: "Default",
    placeholder: "〇〇を入力してください。",
  },
  storyName: "デフォルト",
};

export const Required: ComponentStoryObj<typeof TextInput> = {
  args: {
    label: "Required",
    value: "",
    fullWidth: true,
    type: "text",
    required: true,
  },
  storyName: "必須項目",
};

export const UserName: ComponentStoryObj<typeof TextInput> = {
  args: {
    label: "アカウント名",
    value: "",
    fullWidth: true,
    type: "text",
    required: true,
  },
  storyName: "ユーザー名",
};

export const Email: ComponentStoryObj<typeof TextInput> = {
  args: {
    label: "メールアドレス",
    value: "",
    fullWidth: true,
    type: "email",
    required: true,
  },
  storyName: "メールアドレス",
};

export const Password: ComponentStoryObj<typeof TextInput> = {
  args: {
    label: "パスワード",
    value: "",
    fullWidth: true,
    type: "password",
    required: true,
  },
  storyName: "パスワード",
};

export const FirstName: ComponentStoryObj<typeof TextInput> = {
  args: {
    label: "姓",
    value: "",
    fullWidth: false,
    type: "text",
    required: true,
  },
  storyName: "姓",
};
