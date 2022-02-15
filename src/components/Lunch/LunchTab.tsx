import { FC, memo, useState } from "react";
import { useRouter } from "next/router";
import { Tab } from "@headlessui/react";

import { ReviewList } from "./ReviewList";
import { RestaurantList } from "./RestaurantList";
import { LunchSearchArea } from "./LunchSearchArea";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

// タブの種類
const tabMap = [
  {
    path: "review",
    display: "ランチレビュー",
  },
  {
    path: "restaurant",
    display: "お店情報",
  },
];

/**
 * ランチのレビューと店情報の切り替え用タブ.
 */
export const LunchTab: FC<{ path: string }> = memo(
  ({ path }: { path: string }) => {
    const router = useRouter();

    // レストラン一覧の現在のページ
    const [pageIndex, setPageIndex] = useState(1);

    return (
      <div className="w-full">
        <Tab.Group
          onChange={(idx) => {
            // タブが変更されたらrouterへpush。
            router.push(
              {
                pathname: router.pathname,
                query: {
                  path: [tabMap[idx].path],
                },
              },
              undefined,
              { shallow: true },
            ); // shallowすることでrouterを再度呼び出さない
          }}
          defaultIndex={path === "restaurant" ? 1 : 0}
        >
          <Tab.List className="flex p-1 space-x-1 bg-bgc rounded-xl">
            {tabMap.map((tab) => (
              <Tab
                key={tab.path}
                className={({ selected }) =>
                  classNames(
                    "w-full py-2.5 text-sm leading-5 font-bold text-text-brown rounded-lg",
                    "focus:outline-none focus:ring-2 ring-offset-2 ring-white ring-opacity-60",
                    selected
                      ? "bg-white shadow border-4 border-basic"
                      : "text-text-brown text-opacity-60 hover:text-opacity-100 hover:bg-white hover:bg-opacity-60 ",
                  )
                }
              >
                {tab.display}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              {/* タブがランチレビューの時はレビュー一覧表示 */}
              <ReviewList />
            </Tab.Panel>
            <Tab.Panel>
              {/* タブがお店情報の時は店一覧表示 */}
              <div className="flex flex-col-reverse items-center lg:flex-row lg:items-start">
                <RestaurantList pageIndex={pageIndex} setPageIndex={setPageIndex}/>
                <LunchSearchArea setPageIndex={setPageIndex}/>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    );
  },
);
