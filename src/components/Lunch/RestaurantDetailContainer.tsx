import { FC, memo } from "react";
import Image from "next/image";

import { GoogleMap } from "./GoogleMap";
import { Star } from "./Star";
import type { Restaurant } from "../../types/type";
import { getRestaurantPhotoPath, returnCodeToBr } from "../../utils/methods";

type Props = {
  restaurant: Restaurant;
};

/**
 * 店詳細画面のメイン部分のコンポーネント.
 */
export const RestaurantDetailContainer: FC<Props> = memo((props) => {
  const { restaurant } = props;

  /**
   * タイプのidから文字列に変換する.
   * @returns 店内かお弁当か両方か
   */
  const typeValue = () => {
    if (restaurant.type === 1) {
      return "店内";
    } else if (restaurant.type === 2) {
      return "お弁当";
    } else if (restaurant.type === 3) {
      return "両方";
    }
  };

  return (
    <div className="flex-col m-5 xl:mx-20 lg:w-2/3">
      <p className="text-lg lg:text-3xl font-extrabold border-l-8 border-basic mb-5">
        {restaurant.name}
      </p>
      <div className="flex flex-col lg:flex-row items-baseline">
        <span className="mr-8 mb-5 sm:mb-0">
          <Star starCount={restaurant.star} />
        </span>
        <div className="flex flex-col sm:flex-row items-baseline">
          ジャンル: {restaurant.genreValue}
          <span className="sm:ml-8">タイプ: {typeValue()}</span>
        </div>
      </div>
      <div className="mt-5 sm:mt-10">
        <div>
          <Image
            src={getRestaurantPhotoPath(restaurant.photoPath)}
            width={300}
            height={200}
            alt="restaurant photo"
          />
        </div>
        {restaurant.description && (
          <div className="mt-10 break-all">
            {returnCodeToBr(restaurant.description)}
          </div>
        )}
        {restaurant.smoking && (
          <div className="mt-10">禁煙席: {restaurant.smoking}</div>
        )}
      </div>
      <p className="mt-10">住所: {restaurant.address}</p>
      {restaurant.access && (
        <p className="mt-10">アクセス: {restaurant.access}</p>
      )}
      {/* 緯度と軽度から、googleマップを表示 */}
      {restaurant.latitude && (
        <div className="w-5/6 mx-auto">
          <p className="mt-10">Map</p>
          <GoogleMap
            latitude={restaurant.latitude}
            longitude={restaurant.longitude}
          />
        </div>
      )}
      {restaurant.url && (
        <p className="my-10 break-all">
          参考URL:
          <a
            href={restaurant.url}
            target="_blank" // 別タブで開く
            rel="noopener noreferrer" // 外部リンクを開く場合は安全性のためにつける
            className="underline hover:text-text-brown"
          >
            {" "}
            {restaurant.url}
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
      )}
    </div>
  );
});
