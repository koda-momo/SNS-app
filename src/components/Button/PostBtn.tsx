import { memo, FC } from "react";
import { useModal } from "../../hooks/useModal";
import { PostModal } from "../Modal/PostModal";

type Props = {
  success: () => void; //投稿完了後、自動で更新したい場合は更新のメソッドを渡す
};

export const PostBtn: FC<Props> = memo((props) => {
  const { success } = props;

  // モーダル開閉用カスタムフック呼び出し
  const { modalStatus, openModal, closeModal } = useModal();

  return (
    <>
      {modalStatus ? (
        <PostModal
          isOpen={modalStatus}
          closeModal={closeModal}
          title={"つぶやき"}
          success={success}
        />
      ) : (
        <div className="fixed bottom-20 right-10">
          <button
            type="button"
            className="rounded-full text-white bg-basic w-10 h-10 shadow-lg"
            onClick={openModal}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
      )}
    </>
  );
});
