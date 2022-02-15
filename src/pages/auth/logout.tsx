import { NextPage } from "next";
import { useCallback, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "../../components/Button/Button";
import { useRouter } from "next/router";
import Cookie from "universal-cookie";
import toast from "react-hot-toast";

import { useModal } from "../../hooks/useModal";

/**
 * ログアウトページ.
 * @returns ログアウトページ
 */
const Logout: NextPage = () => {
  //ルーターリンク
  const router = useRouter();

  // モーダル開閉用カスタムフック呼び出し
  const { modalStatus, setModalStatus, closeModal } = useModal();

  /**
   * キャンセルボタン押下で発動.
   */
  const cancelLogout = useCallback(() => {
    //モーダルを閉じる
    closeModal();
    //元のページに戻る
    router.back();
  }, [router, closeModal]);

  /**
   * ログアウトボタン押下で発動.
   */
  const logout = useCallback(() => {
    //cookieを使用する
    const cookie = new Cookie();
    cookie.remove("hash", { path: "/" });
    cookie.remove("loginId", { path: "/" });

    if (cookie.get("hash") === undefined) {
      //ログアウトしたらアラート
      toast.success("ログアウトしました");
      //ログインページに戻る
      router.push("/auth/login");
    } else {
      //ログアウトに失敗(cookieが消せなかった)
      toast.error("ログアウトに失敗しました");
      //モーダルを閉じる
      closeModal();
      //元のページに戻る
      router.back();
    }
  }, [closeModal, router]);

  // ページ遷移時にモーダルを開く
  useEffect(() => {
    setModalStatus(true);
  }, [setModalStatus]);

  return (
    <>
      <Transition appear show={modalStatus} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => {
            router.back();
          }}
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
                  ログアウトしますか？
                </Dialog.Title>
                <div className="flex flex-row justify-center mt-5">
                  <div className="mx-2">
                    <Button color="#622d18" label={"はい"} onClick={logout} />
                  </div>
                  <div className="mx-2">
                    <Button
                      backgroundColor="#f6f0ea"
                      color="#622d18"
                      label={"キャンセル"}
                      onClick={cancelLogout}
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
};
export default Logout;
