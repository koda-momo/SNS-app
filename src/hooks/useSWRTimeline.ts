import { useCallback } from "react";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";

import { JAVA_API_URL } from "../utils/const";

const LIMIT = 50; // 50件ずつ読み込む

/**
 * レビューのリストを取得するカスタムフック.
 *
 * @param hash ログイン中のユーザーのハッシュ値
 * @returns
 * - data: データ
 * - isLast: 最後まで読み込んだかどうか
 * - error: エラー
 * - loadMoreReviews: 次のデータを読み込むメソッド
 */
export const useSWRTimeline = (hash: string) => {
  /**
   * 各ページのSWRのキーを取得する関数.
   *
   * @remarks
   * useSWRInfiniteからデータをフェッチする際に呼び出される。
   * @param pageIndex - ページインデックス
   * @param previousPageData -
   * @returns ページのキー
   */
  const getKey: SWRInfiniteKeyLoader = useCallback(
    (pageIndex, previousPageData) => {
      // 最後まで読み込んだらnullを返す
      if (previousPageData && previousPageData.TimelineList.length < LIMIT)
        return null;

      // 一番最初のフェッチ
      //まだデータが0件なら、普通にAPI呼ぶ
      if (pageIndex === 0) return `${JAVA_API_URL}/timeline/${hash}`;

      // 一番古いレビューのIDを取得
      const id =
        previousPageData.TimelineList[previousPageData?.TimelineList.length - 1]
          .id;

      // 「過去の投稿を見る」ボタンを押したとき
      // 一番下の投稿IDをAPIに渡す
      return `${JAVA_API_URL}/timeline/old/${id}/${hash}`;
    },
    [hash],
  );

  // data: データの連想配列の配列(※ページごとの配列)
  // error: エラーの場合、エラー情報が入る
  // size:  ページサイズ(ページが何ページあるのか※最初は1ページ)
  // setSize:  ページサイズ変更する際に使用する(ページ数を増やすと自動的にフェッチ処理が走る)
  // mutate: 再検証する際に使用する
  const { data, error, size, setSize, mutate } = useSWRInfinite(getKey);

  /**
   * 投稿を追加読み込みする.
   *
   * @remarks
   * ページサイズを増やすことで、次のフェッチ処理を走らせる。
   */
  const loadMoreTimeline = useCallback(() => {
    setSize(size + 1);
  }, [setSize, size]);

  // 最後まで読み込んだかどうか
  const isLast = data
    ? data.filter((pageData) => pageData?.TimelineList?.length < LIMIT).length >
      0
    : false;

  return { data, isLast, error, loadMoreTimeline, timelineMutate: mutate };
};
