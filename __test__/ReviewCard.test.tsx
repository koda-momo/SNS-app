/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { composeStories } from "@storybook/testing-react";
import * as stories from "../src/stories/ReviewCard.stories";
import { getFormattedDate } from "../src/utils/methods";

// composeStories関数は、セットアップされた Story をそのまま jest で再利用（render）可能にする合成関数
const {
  ListWithRestaurantLink,
  ListWithoutRestaurantLink,
  DetailWithRestaurantLink,
  DetailWithoutRestaurantLink,
} = composeStories(stories);

// describeでテストのタイトルを定義
describe("ReviewCard Component Test", () => {
  // itでテストケースを定義
  it("レビューカードが上手く表示されるか(一覧、レストランリンク付き)", () => {
    render(<ListWithRestaurantLink />);
    // expectで検証したい内容を記述
    expect(screen.getByText("Suzu")).toBeInTheDocument();
    expect(screen.getByText("(4.5)")).toBeInTheDocument();
    expect(screen.getByText("おいしかった！")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("らーめん はやし田")).toBeInTheDocument();
    expect(
      screen.queryByText(
        `投稿日時：${getFormattedDate(new Date("2022-01-21 22:31:29"))}`, // 投稿日時が表示されないことを確認
      ),
    ).toBeNull();
  });

  it("レビューカードが上手く表示されるか(一覧、レストランリンクなし)", () => {
    render(<ListWithoutRestaurantLink />);
    // expectで検証したい内容を記述
    expect(screen.getByText("Suzu")).toBeInTheDocument();
    expect(screen.getByText("(4.5)")).toBeInTheDocument();
    expect(screen.getByText("おいしかった！")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.queryByText("らーめん はやし田")).toBeNull(); // queryByText().toBeNull()で存在しないことを検証
    expect(
      screen.queryByText(
        `投稿日時：${getFormattedDate(new Date("2022-01-21 22:31:29"))}`, // 投稿日時が表示されないことを確認
      ),
    ).toBeNull();
  });

  it("レビューカードが上手く表示されるか(詳細、レストランリンク付き)", () => {
    // ダミーのpropsを渡してコンポーネントをレンダー
    render(<DetailWithRestaurantLink />);
    expect(screen.getByText("らーめん はやし田")).toBeInTheDocument();
    expect(
      screen.getByText(
        `投稿日時：${getFormattedDate(new Date("2022-01-21 22:31:29"))}`, // 詳細なら投稿日時が表示されるか
      ),
    ).toBeInTheDocument();
  });
  
  it("レビューカードが上手く表示されるか(詳細、レストランリンクなし)", () => {
    // ダミーのpropsを渡してコンポーネントをレンダー
    render(<DetailWithoutRestaurantLink />);
    expect(screen.queryByText("らーめん はやし田")).toBeNull();
    expect(
      screen.getByText(
        `投稿日時：${getFormattedDate(new Date("2022-01-21 22:31:29"))}`, // 詳細なら投稿日時が表示されるか
      ),
    ).toBeInTheDocument();
  });
});
