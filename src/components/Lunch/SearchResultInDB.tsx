import { FC, memo } from "react";
import { useRouter } from "next/router";
import type { Restaurant } from "../../types/type";

type Props = {
  restautrantsInDB: Array<Restaurant>;
};

/**
 * レストランDBからの検索結果を表示するコンポーネント.
 */
export const SearchResultInDB: FC<Props> = memo((props) => {
  const { restautrantsInDB } = props;

  const router = useRouter();

  return (
    <>
      <p className="mb-5 font-bold">もしかしてこのお店？(登録済みのお店)</p>
      <ul>
        {restautrantsInDB.map((restautrant: Restaurant) => {
          return (
            <li key={restautrant.id} className="flex items-center mb-3">
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
                onClick={() =>
                  router.push(`/lunch/restaurant/${restautrant.id}`)
                }
              >
                {restautrant.name}
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
});
