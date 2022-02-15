import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { defaultSearchParams } from "../utils/options";

type Params = {
  orderParam: string;
  genreParam: string;
  typeParam: number;
};
type RestaurantListContextType = {
  params: Params;
  setParams: Dispatch<SetStateAction<Params>>;
};
type Props = {
  children: ReactNode;
};

//contextを使用する
export const RestaurantListContext = createContext(
  {} as RestaurantListContextType,
);

/**
 * レストラン一覧取得のparamsを管理するグローバルstate.
 */
export const RestaurantListProvider: FC<Props> = (props) => {
  const { children } = props;

  const [params, setParams] = useState<Params>(defaultSearchParams);

  return (
    <RestaurantListContext.Provider
      value={{
        params,
        setParams,
      }}
    >
      {children}
    </RestaurantListContext.Provider>
  );
};
