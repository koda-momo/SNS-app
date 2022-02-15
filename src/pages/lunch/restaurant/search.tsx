import type { NextPage } from "next";

import { Button } from "../../../components/Button/Button";
import { TextInput } from "../../../components/Form/TextInput";
import { SubHeader } from "../../../components/Layout/SubHeader";
import { SearchResultInDB } from "../../../components/Lunch/SearchResultInDB";
import { HotpepperResult } from "../../../components/Lunch/HotpepperResult";
import { useSearchRestaurant } from "../../../hooks/useSearchRestaurant";

/**
 * お店を検索するページ.
 *
 * @returns お店を検索する画面
 */
const RestaurantSearch: NextPage = () => {
  // お店検索用カスタムフックを呼び出し
  const {
    searchName,
    inputRestaurantName,
    searchInDB,
    searchByNameIn2km,
    restautrantsInDB,
    hasClickedSearch,
    hotpeppers,
    selectRestaurant,
    clear,
  } = useSearchRestaurant();

  return (
    <>
      <SubHeader title={"お店検索"} />
      <div className="max-w-screen-sm w-5/6 mx-auto py-5">
        <div className="flex flex-col gap-3 mb-5">
          <TextInput
            label={"店名"}
            value={searchName}
            type={"text"}
            fullWidth={true}
            required={true}
            onChange={inputRestaurantName}
            onKeyUp={searchInDB}
          />
          <Button label="店名で検索" onClick={searchByNameIn2km} />
          <span className="font-normal text-sm">
            ※第2ラーセンから半径2km以内で検索
          </span>
        </div>
        {/* データベースに登録済みの店をオートコンプリートに表示する部分 */}
        {restautrantsInDB.length > 0 && (
          <SearchResultInDB restautrantsInDB={restautrantsInDB} />
        )}

        {/* ホットペッパー検索結果表示 */}
        {hasClickedSearch && (
          <HotpepperResult
            hotpeppers={hotpeppers}
            selectRestaurant={selectRestaurant}
            clear={clear}
          />
        )}
      </div>
    </>
  );
};

export default RestaurantSearch;
