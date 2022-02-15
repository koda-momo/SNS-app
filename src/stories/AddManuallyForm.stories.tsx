import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";

import { AddManuallyForm } from "../components/Lunch/AddManuallyForm";
import { action } from "@storybook/addon-actions";

export default {
  component: AddManuallyForm,
  render: () => {
    return (
      <div className="max-w-xl w-5/6 mx-auto py-5">
        <AddManuallyForm cansel={action("cansel")} />
      </div>
    );
  },
} as ComponentMeta<typeof AddManuallyForm>;

// 名前付きエクスポートはデフォルトでストーリーオブジェクトを表す
export const Empty: ComponentStoryObj<typeof AddManuallyForm> = {
  args: {
    cansel: action("cansel"),
  },
  // play関数を用いると、インタラクティブストーリーを登録できる
  // ストーリーがレンダリングされたタイミングで実行される
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("新規登録")); // 空欄のまま登録ボタンを押す
  },
  storyName: "空欄",
};

export const Filled: ComponentStoryObj<typeof AddManuallyForm> = {
  ...Empty,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText("店名"), "いきなりステーキ", {   // 文字を打たせる
      delay: 100,
    });
    await userEvent.type(canvas.getByLabelText("郵便番号(ハイフンなし)"), "1600022", {
      delay: 100,
    });
    await userEvent.click(canvas.getByText("郵便番号から住所を取得"));  // ボタンを押させる
    await userEvent.type(canvas.getByPlaceholderText("番地以降(○-○-○)"), "1-1-1", {
      delay: 100,
    });
    await userEvent.type(canvas.getByLabelText("店の説明(140字以内)"), "とてもおいしいステーキのお店です", {
      delay: 100,
    });
    await userEvent.type(canvas.getByLabelText("参考URL"), "http://example.com", {
      delay: 100,
    });
    await userEvent.click(canvas.getByText("新規登録"));
  },
  storyName: "",
};

// 郵便番号での住所検索を行うストーリー
export const SearchAddress: ComponentStoryObj<typeof AddManuallyForm> = {
  ...Empty,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText("郵便番号(ハイフンなし)"), "1600022", {
      delay: 300,
    });
    await userEvent.click(canvas.getByText("郵便番号から住所を取得"));
    await userEvent.type(canvas.getByPlaceholderText("番地以降(○-○-○)"), "1-1-1", {
      delay: 300,
    });
  },
  storyName: "",
};
