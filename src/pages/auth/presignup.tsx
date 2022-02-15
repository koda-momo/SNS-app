import type { NextPage } from "next";

import { TextInput } from "../../components/Form/TextInput";
import { Button } from "../../components/Button/Button";
import { SelectBox } from "../../components/Form/SelectBox";
import { usePreSignup } from "../../hooks/usePreSignup";

/**
 * ユーザー仮登録画面.
 * @returns 仮登録するためのページ
 */
const PreSignUp: NextPage = () => {
  //フックスから仮登録時の関数を取得
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    setSelectValue,
    selectValue,
    options,
    isLoading,
  } = usePreSignup();

  return (
    <>
      <div className="border-solid  border-2 border-bgc-200 m-10  shadow-lg rounded-xl text-center">
        <div className="text-3xl text-text-brown mt-5 text-center font-bold ">
          仮登録フォーム
        </div>
        {isLoading ? (
          <div className="flex justify-center mt-20 w-full h-64">
            <div className="animate-spin h-8 w-8 bg-basic rounded-xl"></div>
          </div>
        ) : (
          <div className="flex flex-col items-center mt-10">
            <div className="lg:flex sm:flex gap-3 w-auto">
              <div className="mt-3">
                <TextInput
                  label="姓"
                  type="text"
                  fullWidth={false}
                  required
                  errorMessage={errors.firstName?.message}
                  placeholder="姓"
                  registers={register("firstName")}
                />
              </div>
              <div className="mt-3">
                <TextInput
                  label="名"
                  type="text"
                  fullWidth={false}
                  required
                  errorMessage={errors.lastName?.message}
                  placeholder="名"
                  registers={register("lastName")}
                />
              </div>
            </div>
            <div className="lg:flex sm:flex gap-3 w-auto">
              <div className="mt-3">
                <TextInput
                  label="メールアドレス"
                  type="text"
                  fullWidth={false}
                  required
                  errorMessage={errors.email?.message}
                  placeholder="メールアドレス"
                  registers={register("email")}
                />
              </div>
              <div className="mt-4">
                <SelectBox
                  label="ドメイン"
                  selectedOption={selectValue}
                  select={setSelectValue}
                  options={options}
                />
              </div>
            </div>

            <div className="gap-3 mt-10 mb-10">
              <Button
                label="仮登録"
                backgroundColor="#f28728"
                color="white"
                size="md"
                onClick={handleSubmit(onSubmit)}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default PreSignUp;
