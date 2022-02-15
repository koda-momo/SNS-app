import type { NextPage } from "next";
import { useRouter } from "next/router";

import { Button } from "../../../components/Button/Button";
import { Radio } from "../../../components/Form/Radio";
import { TextInput } from "../../../components/Form/TextInput";
import { useSignup } from "../../../hooks/useSignup";

/**
 * ユーザー登録画面.
 * @returns ユーザー登録するためのページ
 */
const SignUp: NextPage = () => {
  //ルーターリンク
  const router = useRouter();
  //URLの後ろからtoken取得
  const userToken = String(router.query.token);

  //フックスから本登録時に使用する関数を呼び出し
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    userPreTokenData,
    clear,
    error,
    isLoading,
  } = useSignup(userToken);

  //API取得状況による画面初期表示
  if (!error && !userPreTokenData) {
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
    <div>
      <div className="border-solid  border-2 lg:m-10 sm:m-10  shadow-lg rounded-xl text-center">
        <div className="text-3xl text-text-brown mt-5 font-bold ">
          本登録フォーム
        </div>
        {userPreTokenData && (
          <div className="flex flex-col items-center mt-10 mr-3 ml-3">
            {/* トークンから名前とアドレス情報を取得 */}
            <div className="text-xl mt-3">名前:{userPreTokenData.name}</div>
            <div className="mt-3">メールアドレス:{userPreTokenData.email}</div>
            <div className="w-3/4 lg:w-2/4 mt-3">
              {/* アカウント名のテキストフォーム */}
              <TextInput
                label="アカウント名"
                type="text"
                fullWidth={true}
                required
                errorMessage={errors.accountName?.message}
                placeholder="アカウント名"
                registers={register("accountName")}
              />
            </div>
            <div className="w-3/4 lg:w-2/4 mt-3">
              {/* 入社年のテキストフォーム*/}
              <TextInput
                label="入社月"
                type="month"
                fullWidth={true}
                required
                errorMessage={errors.hireDate?.message}
                registers={register("hireDate")}
              />
            </div>
            {/* 職種のラジオボタン */}
            <div className="mt-3">職種を選択してください</div>
            <div className="flex gap-5">
              <Radio
                id="FR"
                value="1"
                name="serviceFk"
                registers={register("serviceFk")}
                defaultChecked
              />
              <Radio
                id="Java"
                value="2"
                name="serviceFk"
                registers={register("serviceFk")}
              />
              <Radio
                id="CL"
                value="3"
                name="serviceFk"
                registers={register("serviceFk")}
              />
              <Radio
                id="QA"
                value="4"
                name="serviceFk"
                registers={register("serviceFk")}
              />
              <Radio
                id="ML"
                value="5"
                name="serviceFk"
                registers={register("serviceFk")}
              />
              <Radio
                id="内勤"
                value="6"
                name="serviceFk"
                registers={register("serviceFk")}
              />
            </div>
            <div className="w-3/4 lg:w-2/4 mt-3">
              {/* 誕生日のテキストフォーム */}
              <TextInput
                label="誕生日"
                type="date"
                fullWidth={true}
                required
                errorMessage={errors.birthDay?.message}
                registers={register("birthDay")}
              />
            </div>
            <div className="w-3/4 lg:w-2/4 mt-3">
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
            <div className="w-3/4 lg:w-2/4 mt-3">
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
            {isLoading ? (
              <div className="flex justify-center mt-10 mb-10  w-full ">
                <div className="animate-spin h-8 w-8 bg-basic rounded-xl"></div>
              </div>
            ) : (
              <div className="flex gap-3 mt-10 mb-10">
                <Button
                  label="登録"
                  backgroundColor="#f28728"
                  color="white"
                  size="md"
                  onClick={handleSubmit(onSubmit)}
                />
                <Button
                  label="クリア"
                  backgroundColor="#f6f0ea"
                  color="#f28728"
                  size="md"
                  onClick={clear}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default SignUp;
