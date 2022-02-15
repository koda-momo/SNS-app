import { useCallback, useContext } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import { loginIdContext } from "../providers/LoginIdProvider";
import { JAVA_API_URL } from "../utils/const";

/**
 * タイムラインコメント投稿用hook.
 * @returns
 */
export const useTimelineCommentPost = () => {
  // ログイン中のユーザーidを取得
  const { hash } = useContext(loginIdContext);

  /**
   * タイムラインコメント投稿用hook.
   * @param postId - 対象投稿ID
   * @param post - 投稿内容
   * @param success - 成功時にデータ更新用メソッド
   * @returns タイムラインコメント投稿メソッド
   */
  const timelineCommentPost = useCallback(
    async (postId: number, post: string, success: () => void) => {
      try {
        const res = await axios.post(`${JAVA_API_URL}/timeline/comment`, {
          userLogicalId: hash, //ログインユーザＩＤ
          sentence: post, //投稿内容
          timelineId: postId, //投稿ＩＤ
        });
        if (res.data.status === "success") {
          toast.success("コメントを登録しました");
          success();
        }
      } catch {
        toast.error("コメントの投稿に失敗しました");
      }
    },
    [hash],
  );

  return { timelineCommentPost };
};
