import { FC, memo, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { ReviewCard } from "./ReviewCard";
import type { LunchReview } from "../../types/type";
import { useSWRReviews } from "../../hooks/useSWRReviews";
import { loginIdContext } from "../../providers/LoginIdProvider";

/**
 * レビュー一覧を表示するコンポーネント.
 */
export const ReviewList: FC = memo(() => {
  // レビューカードがレストラン情報を持つかどうか
  const [hasRestaurantInfo, setHasRestaurantInfo] = useState<boolean>(true);
  const router = useRouter();

  // ユーザーのハッシュ値
  const { hash } = useContext(loginIdContext);

  const { data, isLast, error, loadMoreReviews, reviewsMutate } =
    useSWRReviews(hash);

  // pathにrestaurantが含まれている(店詳細ページにいる)場合はfalseにする
  // レビューページにいるときだけ店詳細ページへのリンクを付けたい
  useEffect(() => {
    const path = router.pathname;
    if (path.includes("restaurant")) {
      setHasRestaurantInfo(false);
    } else {
      setHasRestaurantInfo(true);
    }
  }, [router.pathname]);

  // ローディング処理
  if (!error && !data) {
    return (
      <div className="flex justify-center pt-10">
        <div className="animate-spin h-8 w-8 bg-basic rounded-xl"></div>
      </div>
    );
  }
  // エラー処理
  if (error) {
    return (
      <div className="w-full p-10 text-center">
        データを取得できませんでした
      </div>
    );
  }

  if (
    data !== undefined &&
    data[0].message === "レビューが1件も登録されていません"
  ) {
    return (
      <div className="w-full p-10 text-center">
        レビューが1件も登録されていません🙇‍♀️
      </div>
    );
  }

  return (
    <div className="w-full">
      {data &&
        // dataはページごとの連想配列の配列
        data.map((pageData) =>
          pageData.reviewList?.map((review: LunchReview) => {
            return (
              <div key={review.id}>
                <ReviewCard
                  {...review}
                  type="一覧"
                  hasRestaurantInfo={hasRestaurantInfo}
                  reviewsMutate={reviewsMutate}
                />
              </div>
            );
          }),
        )}
      {/* 最後まで読み込んでいれば過去のレビューを見るボタンを表示しない */}
      {isLast === false ? (
        <div
          className="text-text-brown text-center my-5 cursor-pointer hover:text-basic"
          onClick={loadMoreReviews}
        >
          過去のレビューを見る…
        </div>
      ) : (
        <div className="text-text-brown text-center my-5 ">
          最後まで読み込みました
        </div>
      )}
    </div>
  );
});
