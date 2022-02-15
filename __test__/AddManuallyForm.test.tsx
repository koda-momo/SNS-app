/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { composeStories } from "@storybook/testing-react";
import * as stories from "../src/stories/AddManuallyForm.stories";

// composeStories関数は、セットアップされた Story をそのまま jest で再利用（render）可能にする合成関数
const { Empty } = composeStories(stories);

// describeでテストのタイトルを定義
describe("AddManuallyForm Component Test", () => {
  // itでテストケースを定義
  it("空欄のまま登録ボタンを押すと、必須項目でエラーが表示されるか", async () => {
    const { container } = render(<Empty />);
    // expectで検証したい内容を記述
    // ストーリーに定義したplay関数の実行を待つ
    await Empty.play({ canvasElement: container });

    // エラーが表示されるかチェック
    expect(
      await screen.findByText("店名を入力してください"),
    ).toBeInTheDocument();
    expect(
      await screen.findByText("住所を入力してください"),
    ).toBeInTheDocument();
    expect(
      await screen.findByText("番地以降を入力してください"),
    ).toBeInTheDocument();
  });
  it("正しくない形式のURLを打つとエラーが表示されるか", async () => {
    render(<Empty />);
    userEvent.type(screen.getByLabelText("参考URL"), "あああ");
    userEvent.click(screen.getByText("新規登録"));
    expect(await screen.findByText("URL形式で入力してください"));
  });
});
