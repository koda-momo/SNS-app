import type { NextPage } from "next";
import { useRouter } from "next/router";

import { AddByHotpepper } from "../../../components/Lunch/AddByHotpepper";
import { AddManuallyForm } from "../../../components/Lunch/AddManuallyForm";
import { SubHeader } from "../../../components/Layout/SubHeader";

/**
 * お店情報を追加するページ.
 *
 * @returns お店情報を追加するための画面
 */
const RestaurantAdd: NextPage = () => {
  const router = useRouter();

  // URLのパラメータからホットペッパーIDを取得
  const hotpepperId = router.query.hotpepperId;

  /**
   * お店の登録をキャンセルする.
   *
   * @remarks
   * お店検索ページに戻る。
   */
  const cansel = () => {
    router.push("/lunch/restaurant/search");
  };

  return (
    <>
      <SubHeader title={"お店登録"} />
      <div className="max-w-xl w-5/6 mx-auto py-5">
        {typeof hotpepperId === "string" ? (
          <>
            {/* ホットペッパーにある店を登録する画面 */}
            <AddByHotpepper hotpepperId={hotpepperId} cansel={cansel} />
          </>
        ) : (
          <>
            {/* 手入力で店を登録する画面 */}
            <AddManuallyForm cansel={cansel} />
          </>
        )}
      </div>
    </>
  );
};

export default RestaurantAdd;
