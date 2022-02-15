import axios from "axios";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { JAVA_API_URL } from "../utils/const";

/**
 * 投稿を削除するためのカスタムフック.
 *
 * @param postId - 削除する投稿のID
 * @param type - 何を削除するか
 * @param success - 削除成功後の処理
 * @param hash - ユーザーのハッシュ
 * @returns
 * 投稿を削除するメソッド。
 */
export const useDeletePost = (
  postId: number,
  type: string,
  success: () => void,
  hash: string,
  closeModal: () => void,
) => {
  /**
   * 削除モーダルのはいボタン押下で発動.
   */
  const deletePost = useCallback(async () => {
    try {
      //タイムラインに対する削除
      if (type === "タイムライン") {
        const res = await axios.delete(
          `${JAVA_API_URL}/timeline/${postId}/${hash}`,
        );
        if (res.data.status === "success") {
          toast.success("削除しました");
          //リロード
          if (success) {
            success();
          }
          closeModal();
        } else {
          toast.error(res.data.message);
          closeModal();
        }
      }

      //タイムラインコメントに対する削除
      if (type === "タイムラインコメント") {
        const res = await axios.delete(
          `${JAVA_API_URL}/timeline/comment/${postId}/${hash}`,
        );
        if (res.data.status === "success") {
          toast.success("削除しました");
          //リロード
          if (success) {
            success();
          }
          closeModal();
        } else {
          toast.error(res.data.message);
          closeModal();
        }
      }

      //レビューに対する削除
      if (type === "レビュー") {
        const res = await axios.delete(`${JAVA_API_URL}/review/${postId}`, {
          data: {
            userLogicalId: hash,
          },
        });
        if (res.data.status === "success") {
          closeModal();

          toast.success("削除しました");
          // レビュー一覧再取得
          if (success) {
            success();
          }
        } else {
          toast.error(res.data.message);
          closeModal();
        }
      }

      if (type === "レビューコメント") {
        const res = await axios.delete(
          `${JAVA_API_URL}/review/comment/${postId}/${hash}`,
        );
        if (res.data.status === "success") {
          closeModal();
          toast.success("削除しました");
          // レビュー一覧再取得
          if (success) {
            success();
          }
        } else {
          toast.error(res.data.message);
          closeModal();
        }
      }
    } catch (error) {
      toast.error("削除に失敗しました");
      closeModal();
    }
  }, [closeModal, hash, postId, success, type]);

  return { deletePost };
};
