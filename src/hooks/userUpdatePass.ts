/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import useSWR from "swr";
import axios from "axios";
import toast from "react-hot-toast";

import { JAVA_API_URL } from "../utils/const";
import type { LoginUser, UpdatePassInfo } from "../types/type";

//バリデーションチェック
const schema = yup.object().shape({
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

export const userUpdatePass = (passToken: string) => {
  //useFormから使用するメソッド呼び出し
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    //バリデーション機能を呼び出し
    resolver: yupResolver(schema),
  });

  //ルーターリンク
  const router = useRouter();

  /**
   * APIで初期表示用データ取得.
   */
  const { data: payload, error } = useSWR(`${JAVA_API_URL}/mail/${passToken}`);
  const updatePassData: UpdatePassInfo = payload?.mail;

  /**
   * 送信ボタンを押した時に呼ばれるメソッド.
   * @param data 入力したデータ
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: LoginUser) => {
    const preEmail = updatePassData.email;

    //送信するデータ
    const postData = {
      email: preEmail,
      password: data.password,
    };

    try {
      //APIに変更するユーザーのアドレスと新しいパスを送信する
      const res = await axios.patch(
        `${JAVA_API_URL}/password/${passToken}`,
        postData,
      );
      //パス変更に成功した場合
      if (res.data.status === "success") {
        //入力情報をクリア
        clear();
        toast.success("パスワードの変更が完了しました");
        //パスワード変更完了したら画面遷移
        router.push("/auth/compupdatepass");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  /**
   * 入力データをクリア.
   */
  const clear = () => {
    reset({
      password: "",
      passwordConf: "",
    });
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    error,
    updatePassData,
  };
};
