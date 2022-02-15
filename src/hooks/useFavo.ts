import { useCallback, useState } from "react";
import axios from "axios";
import { JAVA_API_URL } from "../utils/const";

/**
 * 投稿へいいねをするためのカスタムフック.
 *
 * @param postId - いいね対象の投稿ID
 * @param type - 何に対するいいねか
 * @param success - いいね成功時の処理
 * @param hash - ユーザーのハッシュ
 * @returns いいねボタンを押した時のメソッド
 * @returns disabled - ボタンの有効／無効
 */
export const useFavo = (
  postId: number,
  type: string,
  success: () => void,
  hash: string,
) => {
  const [disabled, setDisabled] = useState(false);
  /**
   * ボタン押下でいいね発動.
   */
  const favo = useCallback(
    async (e) => {
      //処理が終わるまでボタンを押せないようにする
      setDisabled(true);
      // 親要素へのイベントを伝播させない
      e.stopPropagation();
      try {
        if (type === "タイムライン") {
          //タイムラインに対するいいね
          const res = await axios.post(`${JAVA_API_URL}/timeline/like`, {
            timelineId: postId, //投稿ID
            userLogicalId: hash, //ログインユーザID
          });
          if (res.data.status === "success") {
            //リロード
            if (success) {
              success();
            }
          }
        }

        if (type === "タイムラインコメント") {
          const res = await axios.post(
            `${JAVA_API_URL}/timeline/comment/like`,
            {
              commentId: postId, //投稿ID
              userLogicalId: hash, //ログインユーザID
            },
          );
          if (res.data.status === "success") {
            //リロード
            if (success) {
              success();
            }
          }
        }

        if (type === "レビュー") {
          const res = await axios.post(`${JAVA_API_URL}/review/like`, {
            reviewId: postId, //投稿ID
            userLogicalId: hash, //ログインユーザID
          });
          if (res.data.status === "success") {
            //リロード
            if (success) {
              success();
            }
          } else {
            console.log(res.data.message);
          }
        }

        if (type === "レビューコメント") {
          const res = await axios.post(`${JAVA_API_URL}/review/comment/like`, {
            commentId: postId, //投稿ID
            userLogicalId: hash, //ログインユーザID
          });
          if (res.data.status === "success") {
            //リロード
            if (success) {
              success();
            }
          } else {
            console.log(res.data.message);
          }
        }
        //処理が終わったらボタンを再度有効に
        setDisabled(false);
      } catch (error) {
        console.log(error);
        setDisabled(false);
      }
    },
    [success, hash, postId, type],
  );

  return { favo, disabled };
};
