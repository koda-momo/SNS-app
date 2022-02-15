import {
  Dispatch,
  FC,
  memo,
  SetStateAction,
  useContext,
  useEffect,
} from "react";

import { RestaurantCard } from "./RestaurantCard";
import { Pagination } from "../Pagination";
import type { Restaurant } from "../../types/type";
import Link from "next/link";
import { RestaurantListContext } from "../../providers/RestaurantListProvider";
import { defaultSearchParams } from "../../utils/options";
import { useSWRRestaurant } from "../../hooks/useSWRRestaurant";

type Props = {
  pageIndex: number;
  setPageIndex: Dispatch<SetStateAction<number>>;
};

/**
 * レストラン一覧用コンポーネント.
 */
export const RestaurantList: FC<Props> = memo((props) => {
  const { pageIndex, setPageIndex } = props;

  // カスタムフックからデータを取得
  const { data, error } = useSWRRestaurant();

  // 検索paramsの更新関数
  const { setParams } = useContext(RestaurantListContext);

  // マウント時にparamsを初期化
  useEffect(() => {
    setParams(defaultSearchParams);
  }, [setParams]);

  // ページング
  // ページあたりの件数
  const perPage = 10;

  // ローディング処理
  if (!error && !data) {
    return (
      <div className="w-full flex justify-center pt-10">
        <div className="animate-spin h-8 w-8 bg-basic rounded-xl"></div>
      </div>
    );
  }

  // エラー処理
  if (error) {
    return (
      <div className="w-full p-10 text-center">
        データを取得できませんでした
      </div>
    );
  }

  if (data.message === "レストランが1件も登録されていません") {
    return (
      <div className="w-full p-10 text-center">
        お店が1件も登録されていません🙇‍♀️
      </div>
    );
  }

  const restaurantList: Array<Restaurant> = data.restaurant;

  return (
    <div className="w-full">
      {restaurantList && (
        <>
          {restaurantList
            // 10件ずつにページング
            .slice(pageIndex * perPage - perPage, pageIndex * perPage)
            .map((restaurant: Restaurant) => {
              return (
                <Link
                  href={`/lunch/restaurant/${restaurant.id}`}
                  key={restaurant.id}
                  prefetch={false} // prefetchをfalseにすることで、ホバー時にプリフェッチする
                >
                  <a>
                    <RestaurantCard {...restaurant} />
                  </a>
                </Link>
              );
            })}
          <Pagination
            perPage={perPage}
            totalCount={restaurantList.length}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
          />
        </>
      )}
    </div>
  );
});
