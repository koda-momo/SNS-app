import { FC, memo, MouseEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

type Props = {
  restaurantId: number;
  restaurantName: string;
  restaurantImg: string;
};

/**
 * レビューから対象の店詳細ページへのリンクカード.
 */
export const LinkToRestaurant: FC<Props> = memo((props) => {
  const { restaurantId, restaurantName, restaurantImg } = props;

  const router = useRouter();

  /**
   * 個別の店情報ページへ遷移するメソッド.
   *
   * @param event
   */
  const goRestaurantDetail = (e: MouseEvent<HTMLInputElement>) => {
    // 親要素へのイベントの伝搬を止める
    e.stopPropagation();
    router.push(`/lunch/restaurant/${restaurantId}`);
  };

  return (
    <div
      className="flex gap-5 items-center border border-gray-300 rounded-md mb-3 w-4/5 mx-auto"
      onClick={goRestaurantDetail}
    >
      <Image
        src={restaurantImg}
        width={100}
        height={80}
        alt="restaurant photo"
      />
      <div className="font-bold text-sm sm:text-md lg:text-lg pr-1">
        {restaurantName}
      </div>
    </div>
  );
});
