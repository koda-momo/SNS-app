import { Dispatch, FC, memo, SetStateAction } from "react";

import { Button } from "../Button/Button";
import { SelectBox } from "../Form/SelectBox";
import {
  orderOptions,
  searchGenreOptions,
  searchTypeOptions,
} from "../../utils/options";
import { useSWRRestaurant } from "../../hooks/useSWRRestaurant";

type Props = {
  setPageIndex: Dispatch<SetStateAction<number>>;
};

/**
 * ランチの並び替えと絞り込みを行うエリア.
 */
export const LunchSearchArea: FC<Props> = memo((props) => {
  const { setPageIndex } = props;

  const { order, setOrder, genre, setGenre, type, setType, onClickSetParams } =
    useSWRRestaurant();

  return (
    <div className="w-5/6 md:w-96 p-5 rounded-lg">
      <div className="text-center">検索</div>
      <div className="flex flex-col gap-3">
        <SelectBox
          label="並び替え"
          options={orderOptions}
          selectedOption={order}
          select={setOrder}
          fullWidth={true}
        />
        <SelectBox
          label="ジャンル"
          options={searchGenreOptions}
          selectedOption={genre}
          select={setGenre}
          fullWidth={true}
        />
        <SelectBox
          label="タイプ"
          options={searchTypeOptions}
          selectedOption={type}
          select={setType}
          fullWidth={true}
        />
        <div className="text-center">
          <Button
            label="検索"
            onClick={() => {
              onClickSetParams();
              setPageIndex(1);
            }}
          />
        </div>
      </div>
    </div>
  );
});
