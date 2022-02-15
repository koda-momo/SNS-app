import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";

import { JAVA_API_URL } from "../utils/const";
import { useModal } from "./useModal";
import type { UpdatePassInfo } from "../types/type";

//バリデーションチェック
const schema = yup.object().shape({
  //メールアドレスのバリデーション
  email: yup
    .string()
    .required("メールアドレスを入力してください")
    .email("メールアドレス形式で入力してください")
    .max(255, "メールアドレスは255文字以内で入力してください"),
});

/**
 * パスワード忘れた場合のメール送信のカスタムフック.
 * @returns
 *  - register:入力したデータ
 *  - handleSubmit:データを入力した際のリアルタイム更新
 *  - errors:エラー
 *  - onSubmit:送信ボタンを押した時のメソッド
 *  - closeModal:モーダルを閉じるメソッド
 *  - doOnButton:入力内容をクリアしてモーダルを閉じるメソッド
 *  - isOpen:モーダルのオープン状態
 */
export const useForgetPass = () => {
  //モーダルの開閉カスタムフック
  const { modalStatus, setModalStatus, closeModal } = useModal();

  //ローディング画面表示
  const [isLoading, setIsLoading] = useState(false);

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

  /**
   * 送信ボタンを押した時のメソッド.
   * @param data 入力したデータ
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = useCallback(
    async (data: UpdatePassInfo) => {
      // ローディング画面表示
      setIsLoading(true);

      //APIに送るデータ
      const postDate = {
        email: data.email,
      };

      try {
        const res = await axios.post(
          `${JAVA_API_URL}/password/sendMail`,
          postDate,
        );
        //メール認証に成功した場合
        if (res.data.status === "success") {
          //メール認証成功したらモーダルを開ける
          setModalStatus(true);
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
    [setIsLoading, setModalStatus],
  );

  /**
   * 入力内容をクリアしてモーダルを閉じる.
   */
  const doOnButton = useCallback(() => {
    //入力値をクリア
    reset({
      email: "",
    });

    //モーダルを閉じる
    setModalStatus(false);
  }, [reset, setModalStatus]);

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    doOnButton,
    modalStatus,
    closeModal,
    isLoading,
  };
};
