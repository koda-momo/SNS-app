import { FC, memo, MouseEvent, useCallback, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { KeyedMutator, useSWRConfig } from "swr";

import { CommentIcon } from "../Button/CommentIcon";
import { FavoBtn } from "../Button/FavoBtn";
import { TrashBtn } from "../Button/TrashBtn";
import { Star } from "./Star";
import { LinkToRestaurant } from "./LinkToRestaurat";
import type { LunchReview } from "../../types/type";
import { loginIdContext } from "../../providers/LoginIdProvider";
import {
  getFormattedDate,
  getRestaurantPhotoPath,
  returnCodeToBr,
} from "../../utils/methods";
import { JAVA_API_URL } from "../../utils/const";

type Props = LunchReview & {
  type: string;
  isHistory?: boolean;
  hasRestaurantInfo: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reviewsMutate: KeyedMutator<any[]>; // レビューリスト更新のmutate関数
};

/**
 * レビューを表示するカードコンポーネント.
 */
export const ReviewCard: FC<Props> = memo((props) => {
  const {
    id,
    userId,
    accountName,
    userPhotoPath,
    restaurantId,
    restaurantName,
    restaurantPhotoPath,
    star,
    sentence,
    likeCount,
    commentCount,
    postedTime,
    myLike,
    type,
    isHistory,
    hasRestaurantInfo,
    reviewsMutate,
  } = props;

  const router = useRouter();

  // グローバルなmutate関数を取得
  const { mutate } = useSWRConfig();

  // ユーザーのハッシュ値
  const { hash } = useContext(loginIdContext);
  // ユーザーID
  const { loginId } = useContext(loginIdContext);

  /**
   * 投稿クリックでレビュー詳細ページに飛ぶ.
   * @param reviewId - レビューID
   */
  const goDetailPage = useCallback(() => {
    router.push(`/lunch/review/${id}`);
  }, [router, id]);

  /**
   * 画像クリックで投稿ユーザ情報ページに飛ぶ.
   */
  const goUserPage = (e: MouseEvent<HTMLInputElement>) => {
    // 親要素へのイベントの伝搬を止める
    e.stopPropagation();
    // e.nativeEvent.stopImmediatePropagation();
    router.push(`/user/${userId}`);
  };

  /**
   * レビューへのいいね成功後の処理.
   * @param reviewId - レビューのID
   */
  const updateReview = useCallback(
    (reviewId: number) => {
      reviewsMutate(); // レビューリストを更新
      mutate(`${JAVA_API_URL}/review/detail/${reviewId}/${hash}`); // レビュー詳細を更新
    },
    [mutate, reviewsMutate, hash],
  );

  /**
   * レビュー削除成功後の処理.
   */
  const deleteReviewSuccess = useCallback(() => {
    reviewsMutate(); // レビューリストを更新
    mutate(`${JAVA_API_URL}/restaurant/${restaurantId}`); // レストラン情報(評価)を更新

    // レビュー詳細ページにいれば、一覧に戻る
    if (type === "詳細") {
      router.back();
    }
  }, [mutate, reviewsMutate, restaurantId, router, type]);

  return (
    <div
      className="flex flex-col w-full p-8 pb-3 relative h-auto border border-t-0 border-gray-200 cursor-pointer"
      onClick={goDetailPage}
    >
      <div className="flex">
        <div className="mr-6" onClick={goUserPage}>
          <Image
            src={`/image/userIcon/${userPhotoPath}`}
            width={type === "詳細" ? 200 : 100}
            height={type === "詳細" ? 200 : 100}
            alt="icon"
            className="rounded-full hover:opacity-80"
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="text-xl font-extrabold pt-3 pb-3 hover:text-text-brown">
            {accountName}
          </div>
          <div>
            <Star starCount={star} />
          </div>
          <div className="pt-5 pb-5 pr-1 break-all">{returnCodeToBr(sentence)}</div>
        </div>
      </div>
      {/* hasRestaurantInfoがtrueならばレストラン情報へのリンクを表示する */}
      {hasRestaurantInfo && (
        <LinkToRestaurant
          restaurantId={restaurantId}
          restaurantName={restaurantName}
          restaurantImg={getRestaurantPhotoPath(restaurantPhotoPath)}
        />
      )}
      <div className="flex flex-col items-end gap-3 sm:flex-row justify-end">
        {(type === "詳細" || isHistory === true) && (
          <span className="mr-7">
            投稿日時：{getFormattedDate(new Date(postedTime))}
          </span>
        )}
        <div>
          <CommentIcon
            commentCount={commentCount}
            postId={id}
            title="レビューへのコメント"
            success={() => updateReview(id)}
          />
          <FavoBtn
            postId={id}
            favoCount={likeCount}
            isFavo={myLike}
            type="レビュー"
            success={() => updateReview(id)}
          />
          {Number(loginId) === userId && (
            <TrashBtn
              postId={id}
              type="レビュー"
              success={deleteReviewSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
});
