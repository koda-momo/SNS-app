import { useCallback, useContext } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import type { Option } from "../types/type";
import { loginIdContext } from "../providers/LoginIdProvider";
import { JAVA_API_URL } from "../utils/const";

/**
 * レビュー投稿用hook.
 * @returns
 */
export const useReviewPost = () => {
  // ログイン中のユーザーidを取得
  const { hash } = useContext(loginIdContext);

  /**
   * レビュー投稿用投稿用hook.
   * @param post - 投稿内容
   * @param star - 星
   * @param restaurantId - 店のID
   * @param success - 成功時にデータ更新用メソッド
   * @returns レビュー投稿メソッド
   */
  const reviewPost = useCallback(
    async (
      post: string,
      star: Option,
      restaurantId: number,
      success: () => void,
    ) => {
      try {
        // レビュー投稿
        const res = await axios.post(`${JAVA_API_URL}/review`, {
          userLogicalId: hash,
          restaurantId,
          sentence: post,
          star: Number(star.id),
        });
        if (res.data.status === "success") {
          if (success) {
            success();
          }
          toast.success(
            "レビューを投稿しました",
          );
        } else {
          toast.error(res.data.message);
        }
      } catch (e) {
        toast.error("レビューの投稿に失敗しました");
      }
    },
    [hash],
  );

  return { reviewPost };
};
