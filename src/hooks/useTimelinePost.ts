import { useCallback, useContext } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import { loginIdContext } from "../providers/LoginIdProvider";
import { JAVA_API_URL } from "../utils/const";

/**
 * タイムライン投稿用hook.
 * @returns
 */
export const useTimelinePost = () => {
  // ログイン中のユーザーidを取得
  const { hash } = useContext(loginIdContext);

  /**
   * タイムライン投稿用hook.
   * @param post - 投稿内容
   * @param success - 成功時にデータ更新用メソッド
   * @returns タイムライン投稿メソッド
   */
  const timelinePost = useCallback(
    async (post: string, success: () => void) => {
      try {
        const res = await axios.post(`${JAVA_API_URL}/timeline`, {
          userLogicalId: hash, //ログインユーザID
          sentence: post, //投稿内容
        });
        if (res.data.status === "success") {
          toast.success("つぶやきを投稿しました");
          if (success) {
            success();
          }
        } else {
          toast.error(`${res.data.message}`);
        }
      } catch (e) {
        toast.error("つぶやきの投稿に失敗しました");
      }
    },
    [hash],
  );

  return { timelinePost };
};
