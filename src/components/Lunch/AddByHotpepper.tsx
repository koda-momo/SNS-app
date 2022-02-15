import { FC, memo, useCallback, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import toast from "react-hot-toast";
import Cookie from "universal-cookie";

import { Button } from "../Button/Button";
import { SelectBox } from "../Form/SelectBox";
import type { Option } from "../../types/type";
import { JAVA_API_URL } from "../../utils/const";
import { typeOptions } from "../../utils/options";

type Props = {
  hotpepperId: string;
  cansel: () => void;
};

/**
 * ホットペッパーから店情報を取得して登録するコンポーネント.
 *
 * @param hotpepperId 登録するホットペッパーのID
 * @param cansel 登録をキャンセルするためのコールバック関数
 */
export const AddByHotpepper: FC<Props> = memo((props) => {
  const router = useRouter();

  const { hotpepperId, cansel } = props;

  // ホットペッパーから店情報を取得
  const { data, error } = useSWR(`/api/hotpepper?hotpepperId=${hotpepperId}`);

  // 登録する店舗のタイプ
  const [type, setType] = useState<Option>(typeOptions[0]);

  // ボタンの活性/非活性
  const [disabled, setDisabled] = useState(false);

  /**
   * APIに情報を渡して店舗を登録する.
   */
  const register = useCallback(
    async (restaurant) => {
      setDisabled(true);

      const cookie = new Cookie();
      try {
        // 店の説明は、restaurant.catchがあればそれ、無ければrestaurant.genre.catchを設定
        const description = restaurant.catch
          ? restaurant.catch
          : restaurant.genre.catch;

        // 店の情報と入力させたタイプをAPIに渡して登録
        const res = await axios.post(`${JAVA_API_URL}/restaurant/hp`, {
          name: restaurant.name,
          address: restaurant.address,
          genreFk: restaurant.genre.code,
          photoPath: restaurant.photo.pc.l,
          type: Number(type.id),
          hotpepperId: restaurant.id,
          description: description,
          access: restaurant.access,
          latitude: restaurant.lat,
          longitude: restaurant.lng,
          url: restaurant.urls.pc,
          smoking: restaurant.non_smoking,
        });
        if (res.data.status === "success") {
          toast.success("お店を登録しました");
          router.replace(`/lunch/restaurant/${res.data.restaurant.id}`);
          cookie.set("addFlag", "true");
        } else {
          setDisabled(false);
          toast.error(res.data.message);
        }
      } catch (error) {
        setDisabled(false);
        toast.error("お店の登録に失敗しました");
      }
    },
    [router, type.id],
  );

  if (!error && !data) {
    return (
      <div className="flex justify-center pt-10 w-full">
        <div className="animate-spin h-8 w-8 bg-basic rounded-xl"></div>
      </div>
    );
  }

  if (error || data.shops.length === 0) {
    return (
      <div className="w-full p-10 text-center">
        データが取得できませんでした
      </div>
    );
  }

  // データから店舗情報を抽出
  const restaurant = data.shops[0];

  return (
    <>
      <div className="text-md md:text-xl text-text-brown my-5 font-bold text-center">
        未登録のお店の為、タイプを選択の上、新規登録をお願いします。
      </div>
      <p className="text-lg lg:text-2xl font-extrabold border-l-8 border-basic mb-5">
        {restaurant.name}
      </p>
      <div className="sm:ml-10 mt-5">
        <Image
          src={restaurant.photo.pc.l}
          alt="image"
          width={300}
          height={200}
        />
      </div>
      <p className="sm:ml-10">▶︎ジャンル: {restaurant.genre.name}</p>
      <p className="sm:ml-10 mt-2">
        ▶︎お店キャッチ:{" "}
        {restaurant.catch ? restaurant.catch : restaurant.genre.catch}
      </p>
      <p className="sm:ml-10 mt-2">▶︎住所: {restaurant.address}</p>
      <p className="sm:ml-10 mt-2">▶︎交通アクセス: {restaurant.access}</p>
      <p className="sm:ml-10 mt-2">
        ▶︎店舗URL:{" "}
        <a
          href={restaurant.urls.pc}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-text-brown"
        >
          {restaurant.urls.pc}
          {/* 外部リンクアイコン */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 inline ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </p>
      <p className="sm:ml-10 mt-2">▶︎禁煙席: {restaurant.non_smoking}</p>
      <div className="w-5/6 mg:w-1/3 sm:ml-10 mt-5">
        <SelectBox
          label="タイプ(店内・お弁当・両方)"
          selectedOption={type}
          select={setType}
          options={typeOptions}
          fullWidth
        ></SelectBox>
      </div>
      <div className="sm:ml-10 mt-10 flex justify-center sm:justify-start gap-3">
        <Button
          label="新規登録"
          onClick={() => register(restaurant)}
          disabled={disabled}
        />
        <Button
          label="キャンセル"
          onClick={cansel}
          backgroundColor="#f6f0ea"
          color="#622d18"
        />
      </div>
    </>
  );
});
