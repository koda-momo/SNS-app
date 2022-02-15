import { useContext } from "react";
import { NextPage } from "next";
import useSWR from "swr";

import { SubHeader } from "../../components/Layout/SubHeader";
import { LikeNotion } from "../../components/Notion/LikeNotion";
import { ReviewNotion } from "../../components/Notion/ReviewNotion";
import { TimelineNotion } from "../../components/Notion/TimelineNotion";
import { loginIdContext } from "../../providers/LoginIdProvider";
import type { notion } from "../../types/type";
import { JAVA_API_URL } from "../../utils/const";

/**
 * 通知ページ.
 * @remarks ログインしているユーザのIDをAPIで送って、該当の情報を取得
 * @returns 通知が見れるページ
 */
const Notion: NextPage = () => {
  //ログインID
  const { hash } = useContext(loginIdContext);

  /**
   * APIを使用してタイムラインデータを取得.
   */
  const { data, error } = useSWR(`${JAVA_API_URL}/notifications/${hash}`);

  //初期表示エラー
  if (!error && !data) {
    <div className="flex justify-center pt-10 w-full">
      <div className="animate-spin h-8 w-8 bg-basic rounded-xl"></div>
    </div>;
  }

  if (error) {
    return <div>データを取得できませんでした</div>;
  }

  //通知0件の場合
  if (data?.message === "通知はまだありません") {
    return (
      <div className="w-full p-10 text-center">通知が1件もありません🙇‍♀️</div>
    );
  }

  return (
    <>
      {/* サブヘッダー */}
      <SubHeader title="通知" />
      {/* タイムラインゾーン */}
      {data &&
        data.notificationList.map((value: notion) => {
          return (
            <div key={value.id} className="border border-t-0 border-gray-200">
              {!value.read && (
                <div className="text-red-500 ml-10 mt-5 text-lg">New!</div>
              )}
              {/* タイムラインに対する反応 */}
              {value.timelineId != null && (
                <TimelineNotion notification={value} />
              )}
              {/* レビューに対する反応 */}
              {value.reviewId && <ReviewNotion notification={value} />}
              {/* コメントに対する反応 */}
              {value.parentCommentId != null && (
                <LikeNotion
                  notification={value}
                  type="コメント"
                  sentence={value.parentCommentSentence}
                />
              )}
            </div>
          );
        })}
    </>
  );
};
export default Notion;
