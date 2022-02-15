import { FC, memo, useCallback, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";
import Cookie from "universal-cookie";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { Button } from "../Button/Button";
import { SelectBox } from "../Form/SelectBox";
import { TextArea } from "../Form/TextArea";
import { TextInput } from "../Form/TextInput";
import type { Option } from "../../types/type";
import { JAVA_API_URL } from "../../utils/const";
import { genreOptions, typeOptions } from "../../utils/options";
import { useGetAddress } from "../../hooks/useGetAddress";

type Props = {
  cansel: () => void;
};

//バリデーションチェック
const schema = yup.object().shape({
  // 店名のバリデーション
  name: yup
    .string()
    .trim()
    .required("店名を入力してください")
    .max(255, "店名は255文字以内で入力してください"),
  // 住所のバリデーション
  address: yup.string().trim().required("住所を入力してください"),
  streetAddress: yup.string().trim().required("番地以降を入力してください"),
  description: yup.string().max(140, "140文字以内で入力してください"),
  url: yup.string().url("URL形式で入力してください"),
});

/**
 * 手入力で店を追加するフォーム.
 *
 * @param cansel 登録をキャンセルするためのコールバック関数
 */
export const AddManuallyForm: FC<Props> = memo((props) => {
  const router = useRouter();

  const { cansel } = props;

  // バリデーション機能を呼び出し
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ボタンの活性/非活性
  const [disabled, setDisabled] = useState(false);

  // 選択したジャンル
  const [genre, setGenre] = useState<Option>(genreOptions[0]);

  // 選択したタイプ
  const [type, setType] = useState<Option>(typeOptions[0]);

  //郵便番号入力用
  const [zipcode, setZipcode] = useState("");

  /**
   * 郵便番号のstateを更新.
   */
  const inputZipcode = useCallback((e) => {
    setZipcode(e.target.value);
  }, []);
  // 郵便番号から住所を取得できるhookを使用
  const { getAddress, errorOfAddress } = useGetAddress(zipcode);

  /**
   * APIを叩いて住所から緯度経度を取得する.
   * @param address - 住所
   * @returns 取得した緯度と経度
   */
  const latitudeLongitude = async (address: string) => {
    const url = "https://msearch.gsi.go.jp/address-search/AddressSearch?q=";

    const res = await axios.get(`${url}${address}`);
    //緯度
    const latitude = String(res.data[0].geometry.coordinates[1] + "0");
    //経度
    const longitude = String(res.data[0].geometry.coordinates[0] + "0");

    return { latitude, longitude };
  };

  //登録ボタンを押した時のメソッド
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setDisabled(true);
    const cookie = new Cookie();
    try {
      // react-hook-formのgetValuesメソッドで入力された住所を取得
      const addressValues = getValues(["address", "streetAddress"]);
      // 入力された住所(前半・後半)を連結して住所を取得
      const address = `${addressValues[0]}${addressValues[1]}`;

      // 緯度経度を取得
      const { latitude, longitude } = await latitudeLongitude(address);

      const res = await axios.post(`${JAVA_API_URL}/restaurant`, {
        name: data.name,
        address: address,
        latitude: latitude,
        longitude: longitude,
        genreFk: genre.id,
        type: Number(type.id),
        description: data.description.trim(), // スペースのみで登録された時、詳細画面に無駄なスペースが表示されるのを防ぐ
        url: data.url,
      });
      //登録に成功した場合
      if (res.data.status === "success") {
        toast.success("お店を登録しました");
        //登録した店の詳細画面に遷移する;
        // replaceを用いることで、遷移後に戻るボタンでここに戻ってくることを防ぐ
        router.replace(`/lunch/restaurant/${res.data.restaurant.id}`);
        cookie.set("addFlag", "true");
      } else {
        //登録に失敗した場合
        toast.error(res.data.message);
        setDisabled(false);
      }
    } catch (error) {
      toast.error("お店の登録に失敗しました");
      setDisabled(false);
    }
  };

  return (
    <>
      <div className="text-xl md:text-3xl text-text-brown my-5 font-bold text-center">
        お店登録フォーム
      </div>
      <div className="flex flex-col gap-5">
        {/* 店名のテキストフォーム */}
        <TextInput
          label="店名"
          type="text"
          fullWidth={true}
          required
          errorMessage={errors.name?.message}
          placeholder="店名"
          registers={register("name")}
        />
        {/* ジャンルのセレクトボックス */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="w-full sm:w-1/2">
            <SelectBox
              label="ジャンル"
              selectedOption={genre}
              select={setGenre}
              options={genreOptions}
              fullWidth={true}
            />
          </div>
          {/* タイプのセレクトボックス */}
          <div className="w-full sm:w-1/2">
            <SelectBox
              label="タイプ"
              selectedOption={type}
              select={setType}
              options={typeOptions}
              fullWidth={true}
            />
          </div>
        </div>
        <div>
          {/* 郵便番号から住所を検索するテキストボックス */}
          <div className="text-red-500">{errorOfAddress}</div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
            <TextInput
              value={zipcode}
              label="郵便番号(ハイフンなし)"
              type="text"
              fullWidth={false}
              maxLength={7}
              required={false}
              onChange={inputZipcode}
            />
            <span
              onClick={() => getAddress(setValue)} // 郵便番号から住所を取得し、住所のテキストボックスに反映する
              className="cursor-pointer text-text-brown text-base md:text-lg underline hover:opacity-70 flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              郵便番号から住所を取得
            </span>
          </div>
        </div>
        {/* 住所のテキストフォーム */}
        <div className="flex gap-1 flex-col sm:flex-row sm:items-end">
          <div className="sm:w-2/5">
            <TextInput
              label="住所"
              type="text"
              fullWidth={true}
              required
              errorMessage={errors.address?.message}
              placeholder="(例)東京都新宿区新宿"
              registers={register("address")}
            />
          </div>
          <div className="flex-1">
            <TextInput
              type="text"
              fullWidth={true}
              required={false}
              errorMessage={errors.streetAddress?.message}
              placeholder="番地以降(○-○-○)"
              registers={register("streetAddress")}
            />
          </div>
        </div>
        {/* 店の説明のテキストエリア */}
        <TextArea
          label="店の説明(140字以内)"
          errorMessage={errors.description?.message}
          placeholder="よかったらどんなお店か教えてください"
          rows={8}
          cols={15}
          registers={register("description")}
        />
        <TextInput
          label="参考URL"
          type="text"
          fullWidth={true}
          required={false}
          errorMessage={errors.url?.message}
          placeholder="参考URL"
          registers={register("url")}
        />
        <div className="mt-5 flex justify-center gap-3">
          <Button
            label="新規登録"
            onClick={handleSubmit(onSubmit)}
            disabled={disabled}
          />
          <Button
            label="キャンセル"
            onClick={cansel}
            backgroundColor="#f6f0ea"
            color="#622d18"
          />
        </div>
      </div>
    </>
  );
});
