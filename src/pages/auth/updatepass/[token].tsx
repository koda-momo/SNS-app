import type { NextPage } from "next";
import { useRouter } from "next/router";

import { TextInput } from "../../../components/Form/TextInput";
import { Button } from "../../../components/Button/Button";
import { userUpdatePass } from "../../../hooks/userUpdatePass";

/**
 * パスワードを忘れたときの画面.
 * @returns パスワードを忘れたときの画面
 */
const UpdatePass: NextPage = () => {
  //ルーターリンク
  const router = useRouter();

  //URLの後ろからtoken取得
  const passToken = String(router.query.token);

  //フックスからパスワード変更時に使用する関数を呼び出し
  const { register, handleSubmit, errors, onSubmit, error, updatePassData } =
    userUpdatePass(passToken);

  if (!error && !updatePassData) {
    return (
      <div className="flex justify-center pt-10 w-full">
        <div className="animate-spin h-8 w-8 bg-basic rounded-xl"></div>
      </div>
    );
  }
  if (error) {
    return <div>データを取得できませんでした</div>;
  }

  return (
    <>
      <div className="border-solid  border-2 border-bgc-200 m-10  shadow-lg rounded-xl text-center">
        <div className="mt-10 ">
          以下のフォームよりパスワードの更新をお願いします
        </div>
        {updatePassData && (
          <div className="flex flex-col items-center mt-5">
            <div className="mt-3">メールアドレス:{updatePassData.email}</div>
            <div className="w-3/4 sm:w-2/4 mt-3">
              {/* パスワードのテキストフォーム */}
              <TextInput
                label="パスワード"
                type="password"
                fullWidth={true}
                required
                errorMessage={errors.password?.message}
                placeholder="8文字以上16文字以内"
                registers={register("password")}
              />
            </div>
            <div className="w-3/4 sm:w-2/4 mt-3">
              {/* 確認用パスワードのテキストフォーム */}
              <TextInput
                label="確認用パスワード"
                type="password"
                fullWidth={true}
                required
                errorMessage={errors.passwordConf?.message}
                placeholder="8文字以上16文字以内"
                registers={register("passwordConf")}
              />
            </div>
            <div className="mt-10 mb-10">
              <Button
                label="変更"
                backgroundColor="#f28728"
                color="white"
                size="md"
                onClick={handleSubmit(onSubmit)}
              />
            </div>{" "}
          </div>
        )}
      </div>
    </>
  );
};
export default UpdatePass;
