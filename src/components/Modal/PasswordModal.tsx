import { FC, memo, useCallback, useContext, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

import { Button } from "../Button/Button";
import { TextInput } from "../Form/TextInput";
import { loginIdContext } from "../../providers/LoginIdProvider";
import { JAVA_API_URL } from "../../utils/const";

type Props = {
  closeModal: () => void; //モーダルを閉じる
  modalStatus: boolean; //モーダル開閉状態
};

/**
 * パスワード変更のためのモーダルのコンポーネント.
 */
export const PasswordModal: FC<Props> = memo((props) => {
  const { closeModal, modalStatus } = props;

  //エラーメッセージ
  const [currentPasswordErrorMessage, setCurrentPasswordError] = useState("");
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState("");
  const [passwordConfErrorMessage, setPasswordConfErrorMessage] = useState("");

  //入力値
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  //各入力フォームに入力した際に更新される
  //現在のパスワード
  const currentPasswordValue = useCallback(
    (e) => {
      setCurrentPassword(e.target.value);
    },
    [setCurrentPassword],
  );

  //新しいパスワード
  const newPasswordValue = useCallback(
    (e) => {
      setNewPassword(e.target.value);
    },
    [setNewPassword],
  );

  //確認用パスワード
  const passwordConfValue = useCallback(
    (e) => {
      setPasswordConf(e.target.value);
    },
    [setPasswordConf],
  );

  //ルーターリンク
  const router = useRouter();

  //ログインID
  const { hash } = useContext(loginIdContext);
  const { loginId } = useContext(loginIdContext);

  /**
   * 入力値をclear.
   */
  const clear = useCallback(async () => {
    //モーダルの入力値クリア
    setCurrentPassword("");
    setNewPassword("");
    setPasswordConf("");
    //エラーの初期化
    setCurrentPasswordError("");
    setNewPasswordErrorMessage("");
    setPasswordConfErrorMessage("");
    //モーダルを閉じる
  }, []);

  /**
   * 登録ボタンを押した時に呼ばれる
   */
  const onSubmit = useCallback(async () => {
    //エラーの初期化
    setCurrentPasswordError("");
    setNewPasswordErrorMessage("");
    setPasswordConfErrorMessage("");

    let error1 = ""; //現在のPW
    let error2 = ""; //新しいPW
    let error3 = ""; //確認PW

    //エラーチェック
    if (newPassword === currentPassword) {
      error1 = "現在のパスワードと同じです";
      setNewPasswordErrorMessage(error1);
    }
    if (passwordConf != newPassword) {
      error3 = "新しいパスワードと一致しません";
      setPasswordConfErrorMessage(error3);
    }
    if (
      !(
        /[A-Z]+/.test(newPassword) &&
        /[a-z]+/.test(newPassword) &&
        /[0-9]+/.test(newPassword)
      )
    ) {
      error2 =
        "アルファベット（大文字小文字混在）と数字とを組み合わせて入力してください";
      setNewPasswordErrorMessage(error2);
    }
    if (newPassword.length < 8 || newPassword.length > 16) {
      error2 = "パスワードは8文字以上16文字以内で設定してください";
      setNewPasswordErrorMessage(error2);
    }

    //空欄系エラー
    if (currentPassword === "") {
      error1 = "現在のパスワードを入力して下さい";
      setCurrentPasswordError(error1);
    }
    if (newPassword === "") {
      error2 = "新しいパスワードを入力して下さい";
      setNewPasswordErrorMessage(error2);
    }
    if (passwordConf === "") {
      error3 = "確認用パスワードを入力して下さい";
      setPasswordConfErrorMessage(error3);
    }

    //エラーがあればリターン
    if (error1 != "" || error2 != "" || error3 != "") {
      return;
    }

    //API送信データ
    const postData = {
      userLogicalId: hash, //ハッシュ値
      beforePassword: currentPassword, //現在のパスワード
      afterPassword: newPassword, //新しいパスワード
    };

    try {
      const res = await axios.patch(`${JAVA_API_URL}/password`, postData);
      if (res.data.status === "success") {
        toast.success("パスワードの変更が完了しました");
        //値の初期化
        clear();
        //更新完了でユーザ情報画面に戻る
        router.push(`/user/${loginId}`);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }

    //[]内入れないと変更が反映されないため、入力
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentPassword,
    currentPasswordErrorMessage,
    loginId,
    newPassword,
    newPasswordErrorMessage,
    passwordConf,
    passwordConfErrorMessage,
    router,
  ]);

  return (
    <>
      <Transition appear show={modalStatus} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => {
            clear();
            closeModal();
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
                  パスワード変更
                </Dialog.Title>
                <div className="mt-2">
                  <div className="text-red-500">
                    {currentPasswordErrorMessage}
                  </div>
                  <TextInput
                    label="現在のパスワード(半角英数字)"
                    type="password"
                    fullWidth={true}
                    required
                    placeholder="8文字以上16文字以内(大文字小文字数字含む)"
                    onChange={currentPasswordValue}
                    value={currentPassword}
                  />
                </div>
                <div className="mt-2">
                  <div className="text-red-500">{newPasswordErrorMessage}</div>
                  <TextInput
                    label="新しいパスワード(半角英数字)"
                    type="password"
                    fullWidth={true}
                    required
                    placeholder="8文字以上16文字以内(大文字小文字数字含む)"
                    onChange={newPasswordValue}
                    value={newPassword}
                  />
                </div>
                <div className="mt-2">
                  <div className="text-red-500">{passwordConfErrorMessage}</div>
                  <TextInput
                    label="確認用パスワード(半角英数字)"
                    type="password"
                    fullWidth={true}
                    required
                    placeholder="8文字以上16文字以内(大文字小文字数字含む)"
                    onChange={passwordConfValue}
                    value={passwordConf}
                  />
                </div>
                {/* ボタン */}
                <div className="mt-4 flex gap-5 justify-center">
                  <Button
                    label="登録"
                    backgroundColor="#f28728"
                    color="white"
                    size="md"
                    onClick={onSubmit}
                  />
                  <Button
                    label="キャンセル"
                    backgroundColor="#f6f0ea"
                    color="#f28728"
                    size="md"
                    onClick={() => {
                      clear();
                      closeModal();
                    }}
                  />
                </div>
                <div>
                  <Link href="/auth/forgetpass">
                    <a className="flex justify-center text-text-brown mt-5 cursor-pointer hover:text-basic">
                      パスワードを忘れた方はこちら
                    </a>
                  </Link>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
});
