import { useCallback, useContext } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import { loginIdContext } from "../providers/LoginIdProvider";
import { JAVA_API_URL } from "../utils/const";

/**
 * レビューコメント投稿用hook.
 * @returns
 */
export const useReviewCommentPost = () => {
  // ログイン中のユーザーidを取得
  const { hash } = useContext(loginIdContext);

  /**
   * レビューコメント投稿用hook.
   * @param postId - 対象投稿ID
   * @param post - 投稿内容
   * @param success - 成功時にデータ更新用メソッド
   * @returns レビューコメント投稿メソッド
   */
  const reviewCommentPost = useCallback(
    async (postId: number, post: string, success: () => void) => {
      try {
        const res = await axios.post(`${JAVA_API_URL}/review/comment`, {
          userLogicalId: hash, //ログインユーザＩＤ
          sentence: post, //投稿内容
          reviewId: postId, // 対象レビューID
        });
        if (res.data.status === "success") {
          toast.success("コメントを登録しました");
          success();
        } else {
          toast.error(res.data.message);
        }
      } catch {
        toast.error("コメントの投稿に失敗しました");
      }
    },
    [hash],
  );

  return { reviewCommentPost };
};
