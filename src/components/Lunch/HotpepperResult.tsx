import { FC, memo } from "react";
import { useRouter } from "next/router";

import { Button } from "../Button/Button";
import type { Restaurant } from "../../types/type";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hotpeppers: Array<any>;
  selectRestaurant: (restaurant: Restaurant) => void;
  clear: () => void;
};

/**
 * ホットペッパーからの検索結果を表示するコンポーネント.
 */
export const HotpepperResult: FC<Props> = memo((props) => {
  const { hotpeppers, selectRestaurant, clear } = props;

  const router = useRouter();

  return (
    <>
      {hotpeppers.length > 0 ? (
        // 検索結果があれば表示する
        <>
          <p className="my-5 font-bold">検索結果(Hotpepperより検索)</p>
          <ul>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {hotpeppers.map((hotpepper: any) => {
              return (
                <li key={hotpepper.id} className="flex items-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span
                    className="cursor-pointer hover:text-text-brown hover:underline"
                    onClick={() => selectRestaurant(hotpepper)}
                  >
                    {hotpepper.name}
                  </span>
                </li>
              );
            })}
          </ul>

          {/* 検索結果はあるが登録したい店に当てはまらないときに対応 */}
          <div className="my-5 font-bold">
            お目当てのお店が見つかりませんか？手入力でお店を登録しますか？
          </div>
          <div className="flex gap-2">
            <Button
              label="手入力で登録"
              onClick={() => router.push("/lunch/restaurant/add")}
            />
            <Button
              label="クリア"
              onClick={clear}
              backgroundColor="#f6f0ea"
              color="#622d18"
            />
          </div>
        </>
      ) : (
        // 検索結果が無ければ、手入力登録に誘導
        <>
          <div className="mb-3 font-bold">
            検索結果が見つかりませんでした。手入力でお店を登録しますか？
          </div>
          <div className="flex gap-2">
            <Button
              label="手入力で登録"
              onClick={() => router.push("/lunch/restaurant/add")}
            />
          </div>
        </>
      )}
    </>
  );
});
