import { FC, memo } from "react";
import Image from "next/image";

import { Star } from "./Star";
import type { Restaurant } from "../../types/type";
import { getRestaurantPhotoPath } from "../../utils/methods";

/**
 * レストラン一覧用のカード.
 */
export const RestaurantCard: FC<Restaurant> = memo((props) => {
  const { name, genreValue, star, type, photoPath } = props;

  /**
   * タイプのidから文字列に変換する.
   * @returns 店内かお弁当か両方か
   */
  const typeValue = () => {
    if (type === 1) {
      return "店内";
    } else if (type === 2) {
      return "お弁当";
    } else if (type === 3) {
      return "両方";
    }
  };

  return (
    <div
      className="flex flex-col xl:flex-row justify-between w-full px-10 py-5 relative h-auto border border-t-0 border-gray-200 cursor-pointer"
    >
      <div className="relative">
        <p className="text-xl font-extrabold border-l-8 border-basic mb-5 lg:mb-10 hover:text-text-brown">
          {name}
        </p>
        <div className="xl:ml-10">ジャンル: {genreValue}</div>
        <div className="xl:ml-10">タイプ: {typeValue()}</div>
        {star > 0 ? (
          <div className="xl:ml-10">
            評価(平均): <Star starCount={star} />
          </div>
        ): <div className="xl:ml-10 mt-2">(レビュー0件)</div>}
      </div>
      <div className="mx-6 mt-3 hover:opacity-80">
        <Image
          src={getRestaurantPhotoPath(photoPath)}
          width={300}
          height={200}
          alt="icon"
        />
      </div>
    </div>
  );
});
