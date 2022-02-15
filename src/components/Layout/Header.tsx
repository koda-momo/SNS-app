import { memo, FC, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  openMenu: () => void;
};

/**
 * ヘッダー.
 */
export const Header: FC<Props> = memo((props) => {
  const { openMenu } = props;
  //ルーターリンク
  const router = useRouter();

  //メニューバーのボタン表示非表示
  const [showMenuBtn, setShowMenuBtn] = useState(true);

  /**
   * 特定のパスの場合、メニューボタンを非表示に.
   */
  useEffect(() => {
    //現在のパス
    const path = router.pathname;
    if (path.includes("/auth/") || path === "/") {
      setShowMenuBtn(false);
    } else {
      setShowMenuBtn(true);
    }
  }, [router.pathname]);

  return (
    <>
      <header className="h-16 w-full shadow-md bg-white flex border-b-4 border-basic">
        <span className="ml-5">
          <Link href="/">
            <a className="flex items-center">
              <Image
                src="/image/rakuraku-sns.png"
                width={50}
                height={50}
                alt="ロゴ"
              />
              <span className="text-3xl text-gray-500 m-3">lunchkus</span>
            </a>
          </Link>
        </span>
        {showMenuBtn ? (
          <span className="ml-auto mr-5 mt-5 lg:hidden md:hidden block">
            <button type="button" onClick={openMenu}>
              <i className="fas fa-bars"></i>
            </button>
          </span>
        ) : (
          <></>
        )}
      </header>
    </>
  );
});
