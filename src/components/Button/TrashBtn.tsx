import { FC, memo } from "react";

import { useModal } from "../../hooks/useModal";
import { DeletePostModal } from "../Modal/DeletePostModal";

type Props = {
  postId: number; //投稿番号
  type:
    | "タイムライン"
    | "タイムラインコメント"
    | "レビュー"
    | "レビューコメント"//レビューかタイムラインか
  success: () => void; //削除成功後にデータ再読み込み
};

/**
 * つぶやきを削除するボタン.
 */
export const TrashBtn: FC<Props> = memo((props) => {
  //削除対象の投稿番号
  const { postId, type, success } = props;

  const modalStore = useModal();
  const { openModal, modalStatus, closeModal } = modalStore;

  return (
    <>
      <DeletePostModal
        modalStatus={modalStatus}
        postId={postId}
        type={type}
        success={success}
        closeModal={closeModal}
      />
      <button
        type="button"
        className="pr-10 focus:outline-none"
        onClick={openModal}
      >
        <i className="fas fa-trash-alt text-gray-500 hover:text-blue-500"></i>
      </button>
    </>
  );
});
