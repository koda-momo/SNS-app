import { FC, memo } from "react";
import { PostModal } from "../Modal/PostModal";
import { useModal } from "../../hooks/useModal";

//コメント数・対象の投稿IDを受け取る
export type Props = {
  title: "つぶやきへのコメント" | "レビューへのコメント";
  commentCount: number;
  postId: number; // 対象の投稿ID
  success: () => void; //投稿完了後、自動で更新したい場合は更新のメソッドを渡す
};

/**
 * コメント追加ボタン
 * @remarks コメント数を渡してあげる
 */
export const CommentIcon: FC<Props> = memo((props) => {
  const { commentCount, postId, success, title } = props;

  // モーダル開閉用カスタムフック呼び出し
  const { modalStatus, openModal, closeModal } = useModal();

  return (
    <>
      {/* コメントモーダル */}
      <PostModal
        title={title}
        isOpen={modalStatus}
        closeModal={closeModal}
        postId={postId}
        success={success}
      />
      <button
        type="button"
        className="pr-10 focus:outline-none"
        onClick={openModal}
      >
        <i className="fas fa-comment text-gray-500 hover:text-yellow-600"></i>
        <span className="pl-1">{commentCount}</span>
      </button>
    </>
  );
});
