import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import * as yup from "yup";
import axios from "axios";
import useSWR from "swr";
import toast from "react-hot-toast";

import { JAVA_API_URL } from "../utils/const";
import type { UserPreInfo, UserSignupInfo } from "../types/type";

//バリデーションチェック
const schema = yup.object().shape({
  //アカウント名のバリデーション
  accountName: yup
    .string()
    .required("アカウント名を入力してください")
    .trim()
    .max(30, "アカウント名は30文字以内で入力してください"),
  //入社年のバリデーション
  hireDate: yup
    .date()
    .typeError("入社年を入力してください")
    .max(new Date(), "入社日は現在よりも前に設定して下さい"),
  //誕生日のバリデーション
  birthDay: yup
    .date()
    .typeError("誕生日を入力してください")
    .max(new Date(), "誕生日は現在よりも前に設定して下さい"),
  //パスワードのバリデーション
  password: yup
    .string()
    .required("パスワードを入力してください")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]+$/,
      "アルファベット（大文字小文字混在）と数字とを組み合わせて入力してください",
    )
    .max(16, "16文字以内で入力してください")
    .min(8, "8文字以上で入力してください"),
  //確認用パスワードのバリデーション
  passwordConf: yup
    .string()
    .required("確認用パスワードを入力してください")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]+$/,
      "アルファベット（大文字小文字混在）と数字とを組み合わせて入力してください",
    )
    .max(16, "16文字以内で入力してください")
    .min(8, "8文字以上で入力してください")
    .oneOf([yup.ref("password"), null], "確認用パスワードが一致していません"),
});

/**
 *本登録する際のメソッド.
 * @param userToken - ユーザーのトークン値
 * @returns
 * - register:入力したデータ
 * - handleSubmit:データを入力した際のリアルタイム更新
 * - errors:バリデーションチェックのエラー
 * - onSubmit:登録ボタンを押した時のメソッド
 * - userPreTokenData:トークンから取得したデータ
 * - clear:入力値をリセットするメソッド
 * - error:API取得状況のエラー
 * - isLoading:ローディングアイコン表示
 */
export const useSignup = (userToken: string) => {
  //useFormから使用するメソッド呼び出し
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // バリデーションを呼び出し
    resolver: yupResolver(schema),
  });

  //ルーターリンク
  const router = useRouter();

  //ローディング画面表示
  const [isLoading, setIsLoading] = useState(false);

  /**
   * APIで初期表示用データ取得.
   */
  const { data: payload, error } = useSWR(`${JAVA_API_URL}/mail/${userToken}`);
  const userPreData = payload?.mail;
  const userPreTokenData: UserPreInfo = userPreData;

  /**
   * 登録ボタンを押した時に呼ばれる.
   * @param data 入力したデータ
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: UserSignupInfo) => {
    // ローディング画面表示
    setIsLoading(true);

    //フォーマットを変換
    const hireDate = String(format(data.hireDate, "yyyy-MM-dd"));
    const birthDay = String(format(data.birthDay, "yyyy-MM-dd"));

    //取得したデータを変数に格納
    const preName = userPreTokenData.name;
    const preEmail = userPreTokenData.email;

    //APIに送るデータ
    const postDate = {
      name: preName,
      accountName: data.accountName,
      email: preEmail,
      hireDate: hireDate,
      birthDay: birthDay,
      serviceFk: data.serviceFk,
      password: data.password,
    };

    try {
      //APIにユーザー登録情報を送信する
      const res = await axios.post(`${JAVA_API_URL}/signup`, postDate);

      //本登録に成功した場合
      if (res.data.status === "success") {
        //会員登録に成功したら登録完了画面に遷移し、入力値をクリアする;
        router.push("/auth/signup/compsignup");
        reset({
          accountName: "",
          hireDate: "",
          birthDay: "",
          password: "",
          passwordConf: "",
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
  };

  /**
   * クリアボタン
   */
  const clear = () => {
    reset({
      accountName: "",
      hireDate: "",
      birthDay: "",
      password: "",
      passwordConf: "",
    });
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    userPreTokenData,
    clear,
    error,
    isLoading,
  };
};
