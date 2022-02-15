import { useCallback } from "react";
import { useRouter } from "next/router";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";

import { JAVA_API_URL } from "../utils/const";

const LIMIT = 50; // 50件ずつ読み込む

/**
 * レビューのリストを取得するカスタムフック.
 * 
 * @param userId ログイン中のユーザーのハッシュ値
 * @returns
 * - data: データ
 * - isLast: 最後まで読み込んだかどうか
 * - error: エラー
 * - loadMoreReviews: 次のデータを読み込むメソッド
 */
export const useSWRReviews = (userId: string) => {
  const router = useRouter();
  const restaurantId = router.query.id;

  /**
   * 各ページのSWRのキーを取得する関数.
   *
   * @remarks
   * useSWRInfiniteからデータをフェッチする際に呼び出される。
   * @param pageIndex - ページインデックス
   * @param previousPageData - 前のページのデータ
   * @returns ページのキー
   */
  const getKey: SWRInfiniteKeyLoader = useCallback((pageIndex, previousPageData) => {
    // 最後まで読み込んだらnullを返す
    if (previousPageData && previousPageData.reviewList.length < LIMIT) return null;

    // 一番最初のフェッチ
    if (pageIndex === 0) {
      return restaurantId === undefined ? `${JAVA_API_URL}/review/${userId}` : `${JAVA_API_URL}/review/restaurant/${restaurantId}/${userId}`;
    }

    // 一番古いレビューのIDを取得
    const id = previousPageData.reviewList[previousPageData.reviewList.length - 1].id;

    // 「過去のレビューを見る」ボタンを押したとき
    // 一番下の投稿IDをAPIに渡す
    return restaurantId === undefined ? `${JAVA_API_URL}/review/old/${id}/${userId}` : `${JAVA_API_URL}/review/restaurant/old/${restaurantId}/${id}/${userId}`;
  }, [restaurantId, userId]);

  // data: データの連想配列の配列(※ページごとの配列)
  // error: エラーの場合、エラー情報が入る
  // size:  ページサイズ(ページが何ページあるのか※最初は1ページ)
  // setSize:  ページサイズ変更する際に使用する(ページ数を増やすと自動的にフェッチ処理が走る)
  // mutate: 再検証する際に使用する
  const { data, error, size, setSize, mutate } = useSWRInfinite(getKey);

  /**
   * レビューを追加読み込みする.
   *
   * @remarks
   * ページサイズを増やすことで、次のフェッチ処理を走らせる。
   */
  const loadMoreReviews = useCallback(() => {
    setSize(size + 1);
  }, [setSize, size]);

  // 最後まで読み込んだかどうか
  const isLast = data
    ? data.filter((pageData) => pageData?.reviewList?.length < LIMIT).length > 0
    : false;

  return { data, isLast, error, loadMoreReviews, reviewsMutate: mutate };
};
