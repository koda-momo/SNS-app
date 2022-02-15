import { useCallback, useContext, useState } from "react";
import useSWR from "swr";

import type { Option } from "../types/type";
import { orderOptions, searchGenreOptions, searchTypeOptions } from "../utils/options";
import { RestaurantListContext } from "../providers/RestaurantListProvider";
import { JAVA_API_URL } from "../utils/const";


/**
 * レストラン一覧を取得するカスタムフック.
 * 
 * @remarks
 * レストラン一覧取得のparamsのセットとuseSWRでのリクエストを行う。
 */
export const useSWRRestaurant = () => {
  // 選択中の並び替え
  const [order, setOrder] = useState<Option>(orderOptions[0]);
  // 選択中のジャンル
  const [genre, setGenre] = useState<Option>(searchGenreOptions[0]);
  // 選択中のタイプ
  const [type, setType] = useState<Option>(searchTypeOptions[0]);

  // グローバルstateからparamsと更新関数を取得
  const {
    params, setParams
  } = useContext(RestaurantListContext);

  /**
   * 検索ボタンが押された時に呼ばれる関数.
   * 
   * @remarks
   * useSWRでのリクエストを行うための検索条件をparamsにセットする。
   */
  const onClickSetParams = useCallback(() => {
    setParams({ orderParam: order.name, genreParam: genre.id, typeParam: Number(type.id) });
  }, [order, genre, type, setParams]);

  // useSWRでレストラン一覧を取得
  const { data, error } = useSWR(
    `${JAVA_API_URL}/restaurant?order=${params.orderParam}&genre=${params.genreParam}&type=${params.typeParam}`,
  );

  return {
    data,
    error,
    params,
    order,
    setOrder,
    genre,
    setGenre,
    type,
    setType,
    onClickSetParams
  };
};
