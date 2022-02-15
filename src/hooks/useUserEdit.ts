import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import toast from "react-hot-toast";
import axios from "axios";
import * as yup from "yup";

import { loginIdContext } from "../providers/LoginIdProvider";
import { UserInfo } from "../types/type";
import { JAVA_API_URL } from "../utils/const";

//バリデーションチェック
const schema = yup.object().shape({
  //姓のバリデーション
  firstName: yup
    .string()
    .trim()
    .required("姓名を入力してください")
    .max(15, "姓名は15文字以内で入力してください"),

  //名のバリデーション
  lastName: yup
    .string()
    .trim()
    .required("名前を入力してください")
    .max(15, "名前は15文字以内で入力してください"),
  //アカウント名のバリデーション
  accountName: yup
    .string()
    .trim()
    .required("アカウント名を入力してください")
    .typeError("アカウント名を入力してください")
    .max(30, "アカウント名は30文字以内で入力してください"),
  //入社年のバリデーション
  hireDate: yup
    .date()
    .typeError("入社年月を入力してください")
    .max(new Date(), "入社日は現在よりも前に設定して下さい"),
  //誕生日のバリデーション
  birthDay: yup
    .date()
    .typeError("誕生日を入力してください")
    .max(new Date(), "誕生日は現在よりも前に設定して下さい"),
  //職種のバリデーション
  serviceFk: yup.string().required("職種を入力して下さい"),
  //プロフィールのバリデーション
  introduction: yup
    .string()
    .nullable()
    .max(140, "自己紹介は140文字以内で入力してください"),
});

/**
 * ユーザ編集画面で使用する機能
 * @returns
 * - register:入力したデータ
 * - handleSubmit:データを入力した際のリアルタイム更新
 * - errors:エラー
 * - onSubmit:更新ボタンを押した時のメソッド
 * @params userData - 初期表示用データ
 */
export const useUserEdit = (userData: UserInfo) => {
  //ログインID
  const { hash } = useContext(loginIdContext);
  const { loginId } = useContext(loginIdContext);

  //ルーターリンク
  const router = useRouter();

  // 年月だけ取得したい初期値は、日付を削る必要があるため
  const defaultHireDate = userData?.hireDate;
  const formatHireDate = defaultHireDate?.slice(0, 7);

  //名前を姓名に分ける
  const fullName = userData?.name;
  const nameArray = fullName?.split(" ");
  const formatFirstName = nameArray?.[0];
  const formatLastName = nameArray?.[1];

  // バリデーション機能を呼び出し
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    //初期値はログインしている人のデータを入れる
    defaultValues: {
      firstName: formatFirstName, //姓
      lastName: formatLastName, //名
      accountName: userData?.accountName, //アカウント名
      hireDate: formatHireDate, //入社年月
      birthDay: userData?.birthDay, //誕生日
      serviceFk: String(userData?.serviceFk), //職種
      introduction: userData?.introduction, //自己紹介
    },
  });

  /**
   * 更新ボタンを押した時に呼ばれる
   * @param data - 入力したデータ
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    //名前：姓＋名
    const name = data.firstName + " " + data.lastName;
    //入社月のフォーマット変更
    const hireDate = String(format(data.hireDate, "yyyy-MM-dd"));
    //誕生日のフォーマット変更
    const birthDay = String(format(data.birthDay, "yyyy-MM-dd"));

    //APIに送るデータ
    const postData = {
      id: loginId, //ログインユーザID
      accountName: data.accountName, //アカウント名
      name: name, //名前
      hireDate: hireDate, //入社月
      serviceFk: data.serviceFk, //職種
      birthDay: birthDay, //誕生日
      introduction: data.introduction, //自己紹介
    };

    try {
      const res = await axios.patch(
        `${JAVA_API_URL}/user/edit/${hash}`,
        postData,
      );
      if (res.data.status === "success") {
        toast.success(res.data.message);
        //更新完了でユーザ情報画面に戻る
        router.push(`/user/${loginId}`);
      } else {
        toast.error("エラー:" + res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * キャンセルボタンを押した時に呼ばれる
   */
  const cancel = () => {
    router.push(`/user/${loginId}`);
  };

  return {
    handleSubmit,
    cancel,
    register,
    errors,
    onSubmit,
    userData,
  };
};
