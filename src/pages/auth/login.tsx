import type { NextPage } from "next";

import { TextInput } from "../../components/Form/TextInput";
import { Button } from "../../components/Button/Button";
import { LinkComp } from "../../components/Form/LinkComp";
import { useLogin } from "../../hooks/useLogin";

/**
 * ログインページ.
 * @returns ログインするためのページ
 */
const Login: NextPage = () => {
  //フックスからログイン時の関数を取得
  const { register, handleSubmit, errors, onSubmit } = useLogin();

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="w-3/4 sm:w-2/4  mt-3">
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
      <div className="w-3/4 sm:w-2/4 mt-3">
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
      <div className="flex gap-3 mt-10">
        <Button
          label="ログイン"
          backgroundColor="#f28728"
          color="white"
          size="md"
          onClick={handleSubmit(onSubmit)}
        />
      </div>
      <LinkComp
        url="/auth/presignup"
        linkText="会員登録はコチラから"
      ></LinkComp>
      <LinkComp
        url="/auth/forgetpass"
        linkText="パスワードを忘れた方はこちらから"
      ></LinkComp>
    </div>
  );
};
export default Login;
