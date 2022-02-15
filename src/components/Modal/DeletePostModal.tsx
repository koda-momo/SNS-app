import { FC, Fragment, memo, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { Button } from "../Button/Button";
import { loginIdContext } from "../../providers/LoginIdProvider";
import { useDeletePost } from "../../hooks/useDeletePost";

type Props = {
  postId: number; //投稿ID
  type:
    | "タイムライン"
    | "タイムラインコメント"
    | "レビュー"
    | "レビューコメント"; //レビューかタイムラインか
  success: () => void; //削除成功後にデータ再読み込み
  modalStatus: boolean; //モーダルの開閉状況
  closeModal: () => void;
};

/**
 * 投稿削除をするためのモーダル.
 * @returns 投稿削除をするためのモーダル
 */
export const DeletePostModal: FC<Props> = memo((props) => {
  const { postId, type, success, modalStatus, closeModal } = props;
  //ログインID
  const { hash } = useContext(loginIdContext);

  // 投稿削除のカスタムフックを使用
  const { deletePost } = useDeletePost(postId, type, success, hash, closeModal);

  return (
    <>
      <Transition appear show={modalStatus} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          {/* モーダルの背景を暗くする */}
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* モーダルを画面の中央に配置するための要素 */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            {/* モーダルの中身部分 */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-lg sm:max-w-2xl p-10 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-bold leading-6 text-text-brown text-center"
                >
                  投稿を削除しますか？
                </Dialog.Title>
                <div className="flex flex-row justify-center mt-5">
                  <div className="mx-2">
                    <Button
                      color="#622d18"
                      label={"はい"}
                      onClick={deletePost}
                    />
                  </div>
                  <div className="mx-2">
                    <Button
                      backgroundColor="#f6f0ea"
                      color="#622d18"
                      label={"キャンセル"}
                      onClick={closeModal}
                    />
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
});
