import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import type { Restaurant } from "../types/type";
import { JAVA_API_URL } from "../utils/const";

/**
 * お店検索機能で使用するカスタムフック.
 */
export const useSearchRestaurant = () => {
  const router = useRouter();

  // 店名で検索するキーワード
  const [searchName, setSearchName] = useState<string>("");

  // データベースに登録済みの店一覧
  const [restautrantsInDB, setRestaurantsInDB] = useState<Array<Restaurant>>(
    [],
  );

  // ホットペッパーからの検索結果
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [hotpeppers, setHotpeppers] = useState<Array<any>>([]);

  // 検索ボタンが押されたかどうか
  const [hasClickedSearch, setHasClickedSearch] = useState<boolean>(false);

  /**
   * 検索窓のonChangeイベント発動時に実行するメソッド.
   *
   * @remarks
   * setStateを使って検索文字列のstateを更新
   */
  const inputRestaurantName = useCallback(async (e) => {
    setSearchName(e.target.value);
  }, []);

  /**
   * 検索窓のonKeyUpイベント発動時に実行するメソッド.
   *
   * @remarks
   * データベースに登録済みの店を検索するAPIを叩く
   */
  const searchInDB = useCallback(async () => {
    try {
      // 検索文字列が空白、もしくはスペースのみでない場合のみ検索を実行
      if (searchName.trim() !== "") {
        const res = await axios.get(
          `${JAVA_API_URL}/restaurant/name/${searchName}`,
        );
        if (res.data.restaurant) {
          // 検索結果がある場合はその店を表示
          setRestaurantsInDB(res.data.restaurant);
        } else {
          // 検索結果が無ければ空の配列をセット
          setRestaurantsInDB([]);
        }
      } else {
        // 検索文字列が空白の場合は空の配列をセット
        setRestaurantsInDB([]);
      }
    } catch (error) {
      toast.error("通信に失敗しました");
    }
  }, [searchName]);

  /**
   * ラーセンから1km以内かつ、店名で検索.
   * @remarks
   * &name_anyとすることで漢字でもかなでも検索できる
   */
  const searchByNameIn2km = async () => {
    // 検索文字列が空白、もしくはスペースのみの場合はエラーを出す
    if (searchName.trim() === "") {
      toast.error("検索文字列を入力してください");
      return;
    }

    // 作成したWebAPIエンドポイントを利用する
    // API Routeを使用することで、APIキーを隠せる
    try {
      const res = await axios.get(`/api/hotpepper?name_any=${searchName}`);
      setHotpeppers(res.data.shops);
      setHasClickedSearch(true);
    } catch (error) {
      toast.error("通信に失敗しました");
    }
  };

  /**
   * ホットペッパーからの検索結果から店を選択する.
   *
   * @param hotpepper - 選択した店の情報
   */
  const selectRestaurant = useCallback(
    async (hotpepper) => {
      // すでに登録されているホットペッパーIDかを確認し、登録済みなら詳細ページへ遷移
      try {
        const res = await axios.get(
          `${JAVA_API_URL}/restaurant/hp/${hotpepper.id}`,
        );
        if (res.data.status === "success") {
          router.push(`/lunch/restaurant/${res.data.restaurant.id}`);
          toast("登録済みの為、詳細ページへ遷移しました", {
            // Custom Icon
            icon: "ℹ️",
          });
          return;
        }
        // 未登録なら登録ページへ遷移
        router.push(`/lunch/restaurant/add?hotpepperId=${hotpepper.id}`);
      } catch (error) {
        toast.error("通信に失敗しました");
      }
    },
    [router],
  );

  /**
   * 検索結果を初期表示にリセットする.
   */
  const clear = () => {
    setRestaurantsInDB([]);
    setHotpeppers([]);
    setHasClickedSearch(false);
    setSearchName("");
  };

  return {
    searchName,
    inputRestaurantName,
    searchInDB,
    searchByNameIn2km,
    restautrantsInDB,
    hasClickedSearch,
    hotpeppers,
    selectRestaurant,
    clear,
  };
};