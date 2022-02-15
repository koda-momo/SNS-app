import { FC, memo, useContext, useState } from "react";
import Link from "next/link";
import { loginIdContext } from "../../providers/LoginIdProvider";

/**
 * メニューバーコンポーネント.
 */
export const MenuBar: FC = memo(() => {
  //ログインID
  const { loginId } = useContext(loginIdContext);

  //ユーザ情報のリンクをログインユーザ先にする
  const [myInfo] = useState(`/user/${loginId}`);

  return (
    <>
      <aside className="bg-bgc h-full w-64 shadow-xl">
        <nav className="text-white text-base font-semibold bg-basic pt-3">
          <Link href="/timeline">
            <a className="flex items-center opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
              つぶやき一覧
            </a>
          </Link>
          <Link href={myInfo}>
            <a className="flex items-center opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
              プロフィール
            </a>
          </Link>
          <Link href="/notion">
            <a className="flex items-center opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
              通知
            </a>
          </Link>
          <Link href="/learcen/info">
            <a className="flex items-center opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
              ラーセン内情報
            </a>
          </Link>
          <Link href="/lunch/review">
            <a className="flex items-center opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
              ランチ情報
            </a>
          </Link>
          <Link href="/auth/logout">
            <a className="flex items-center opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
              ログアウト
            </a>
          </Link>
        </nav>
      </aside>
    </>
  );
});
