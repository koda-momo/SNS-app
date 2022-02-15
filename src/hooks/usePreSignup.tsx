import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";

import { JAVA_API_URL } from "../utils/const";
import type { Option, UserTestInfo } from "../types/type";

//バリデーションチェック
const schema = yup.object().shape({
  //姓のバリデーション
  firstName: yup
    .string()
    .required("姓名を入力してください")
    .trim()
    .max(15, "姓名は15文字以内で入力してください"),
  //名のバリデーション
  lastName: yup
    .string()
    .required("名前を入力してください")
    .trim()
    .max(15, "名前は15文字以内で入力してください"),
  //メールのバリデーション
  email: yup
    .string()
    .required("メールアドレスを入力してください")
    .matches(
      /^[0-9a-zA-Z!#$%&’*+-/=?^_`{|}~.]+$/,
      "半角英数字で入力してください",
    ) //半角英数字+アドレスに使用できる記号のみに変更
    .trim()
    .max(200, "メールアドレスは200文字以内で入力してください"),
});

/**
 * 仮登録画面で使用する機能.
 * @returns
 * - register:入力したデータ
 * - handleSubmit:データを入力した際のリアルタイム更新
 * - errors:エラー
 * - onSubmit:仮登録ボタンを押した時のメソッド
 * - setSelectValue:選択したセレクトボックスの値
 * - selectValue:セレクトボックスの初期値
 * - options:セレクトボックスの選択肢
 */
export const usePreSignup = () => {
  //useFormから使用するメソッド呼び出し
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // バリデーション機能を呼び出し
    resolver: yupResolver(schema),
  });

  //メールアドレスのドメイン選択肢
  const options = [
    { id: "1", name: "@rakus-partners.co.jp" },
    { id: "2", name: "@rakus.co.jp" },
  ];

  //セレクトボックスの初期値
  const [selectValue, setSelectValue] = useState<Option>(options[0]);

  //ルーターリンク
  const router = useRouter();

  //ローディング画面表示
  const [isLoading, setIsLoading] = useState(false);

  /**
   * 登録ボタン押した時のメソッド.
   * @param data 入力データ
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = useCallback(
    async (data: UserTestInfo) => {
      // ローディング画面表示
      setIsLoading(true);

      //APIに送るデータ
      const postDate = {
        name: data.firstName + " " + data.lastName,
        email: data.email + selectValue.name,
      };
      try {
        const res = await axios.post(`${JAVA_API_URL}/presignup`, postDate);
        //初期値エラー

        //仮登録に成功した場合
        if (res.data.status === "success") {
          //仮登録完了画面に遷移し、入力内容をリセット
          router.push("/auth/comppresignup");
          reset({
            firstName: "",
            lastName: "",
            email: "",
          });

          //ローディング画面の閉じる
          setIsLoading(false);
        } else {
          toast.error(res.data.message);
          //ローディング画面の閉じる
          setIsLoading(false);
        }
      } catch (error) {
        alert(error);
        //ローディング画面の閉じる
        setIsLoading(false);
      }
    },
    [reset, router, selectValue.name],
  );

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    setSelectValue,
    selectValue,
    options,
    isLoading,
  };
};
