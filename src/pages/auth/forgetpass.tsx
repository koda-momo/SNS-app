import type { NextPage } from "next";

import { TextInput } from "../../components/Form/TextInput";
import { Button } from "../../components/Button/Button";
import { ConfModal } from "../../components//Modal/ConfModal";
import { useForgetPass } from "../../hooks/useForgetPass";

/**
 * パスワードを忘れたときの画面.
 * @returns パスワードを忘れたときの画面
 */
const ForgetPass: NextPage = () => {
  //フックスからメール送信時の関数を取得
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    doOnButton,
    modalStatus,
    closeModal,
    isLoading,
  } = useForgetPass();

  return (
    <>
      <div className="border-solid  border-2 border-bgc-200 m-10  shadow-lg rounded-xl text-center">
        <div className="mt-10 text-base  sm:text-xl">
          ご登録いただいているメールアドレスをご入力してください
        </div>
        <div className="flex flex-col items-center mt-5">
          <div className="gap-3 w-3/4 mt-3">
            {/* メールアドレスのテキストフォーム */}
            <TextInput
              label="メールアドレス"
              type="text"
              fullWidth={true}
              required
              errorMessage={errors.email?.message}
              placeholder="メールアドレス"
              registers={register("email")}
            />
          </div>
          {isLoading ? (
            <div className="flex justify-center mt-10 mb-10  w-full ">
              <div className="animate-spin h-8 w-8 bg-basic rounded-xl"></div>
            </div>
          ) : (
            <div className="mt-10 mb-10">
              <Button
                label="送信"
                backgroundColor="#f28728"
                color="white"
                size="md"
                onClick={handleSubmit(onSubmit)}
              />
            </div>
          )}
        </div>
        <ConfModal
          isOpen={modalStatus}
          closeModal={closeModal}
          title="ご入力いただいたメールアドレス宛にメールを送信しました"
          message="送信したメールアドレスよりパスワード変更手続きをお願い致します"
          button="了解"
          doOnButton={doOnButton}
        />
      </div>
    </>
  );
};
export default ForgetPass;
