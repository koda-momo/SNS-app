import { memo, FC } from "react";
import Link from "next/link";

/**
 * フッター.
 */
export const Footer: FC = memo(() => {
  return (
    // <footer className="h-12 w-full shadow-md bg-basic text-sm text-gray-600 flex justify-center items-center">
    <footer className="h-20 w-full shadow-md bg-basic text-sm text-gray-600 text-center">
      <div className="py-3">©lunchkus</div>
      <div>
        Powered by
        <Link href="http://webservice.recruit.co.jp/">
          <a className="hover:text-bgc">ホットペッパー Webサービス</a>
        </Link>
      </div>
    </footer>
  );
});
