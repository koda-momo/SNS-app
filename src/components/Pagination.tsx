import type { Dispatch, FC, SetStateAction } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

type Props = {
  totalCount: number; // リストの件数
  perPage: number; // 1ページあたりの件数
  pageIndex: number; // 現在のページ
  setPageIndex: Dispatch<SetStateAction<number>>; // 現在のページの更新関数
};

/**
 * ページングのためのコンポーネント.
 */
export const Pagination: FC<Props> = (props) => {
  const { totalCount, perPage, pageIndex, setPageIndex } = props;
  /**
   * ページングのためのメニューを生成
   *
   * @remarks
   * 1ページ目と最後のページは必ず表示。＋現在のページの前後1ページを表示する。
   * 1の隣(2が表示されない時)と最後の数の隣は…（省略記号）を表示させる。
   * @returns numberArray - ページングメニュー
   */
  const range = () => {
    // 最後のページ
    const end = Math.ceil(totalCount / perPage);

    let numberArray: Array<number | "…"> = [];
    for (let i = 1; i <= end; i++) {
      if (
        i == 1 || // 1ページ目
        i == end || // 最後のページ
        (i >= pageIndex - 1 && i <= pageIndex + 1) // 現在のページの前後
      ) {
        // 数字を配列に入れる
        numberArray = [...numberArray, i];
      } else if (i == 1 + 1 || i == end - 1) {
        // 1の隣と最後の数の隣は…を表示
        numberArray = [...numberArray, "…"];
      }
    }
    return numberArray;
  };

  return (
    <div className="py-5 flex flex-col items-center justify-center">
      <nav
        className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
        aria-label="Pagination"
      >
        {/* 前へ戻るボタン */}
        {pageIndex > 1 && (
          <a
            href="#"
            className="px-2 py-2 rounded-l-md border border-gray-400  text-sm font-medium text-gray-500 hover:bg-gray-50"
            onClick={() => setPageIndex(pageIndex - 1)}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </a>
        )}
        {range().map((number, index) =>
          number === "…" ? (
            <div
              className="z-10 border-gray-400 relative inline-flex items-center px-2 sm:px-4 py-2 border text-sm"
              key={index}
            >
              …
            </div>
          ) : (
            <a
              href="#"
              className={`${
                number === pageIndex &&
                "border-basic text-basic font-bold bg-bgc hover:bg-bgc z-10 pointer-events-none"
              } border-gray-400 relative inline-flex items-center px-4 py-2 border text-sm hover:bg-gray-50`}
              key={index}
              onClick={() => setPageIndex(number)}
            >
              {number}
            </a>
          ),
        )}
        {/* 次へ進むボタン */}
        {pageIndex !== Math.ceil(totalCount / perPage) && (
          <a
            href="#"
            className="px-2 py-2 rounded-r-md border border-gray-400 text-sm font-medium text-gray-500 hover:bg-gray-50"
            onClick={() => setPageIndex(pageIndex + 1)}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </a>
        )}
      </nav>
      <div className="mt-2 text-sm">全{totalCount}件</div>
    </div>
  );
};
