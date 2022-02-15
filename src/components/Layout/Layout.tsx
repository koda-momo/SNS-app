import { FC, memo, ReactNode, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { MenuBar } from "./MenuBar";
//ログインチェッカーをONにしたいときコメント外す
import { LoginChecker } from "../Auth";
import { LoginIdProvider } from "../../providers/LoginIdProvider";
import { RestaurantListProvider } from "../../providers/RestaurantListProvider";

type Props = {
  children: ReactNode;
};

/**
 * 全体のレイアウト用コンポーネント.
 */
export const Layout: FC<Props> = memo((props) => {
  const { children } = props;

  //ルーターリンク
  const router = useRouter();
  //メニューバー表示非表示
  const [showMenu, setShowMenu] = useState(true);

  //メニューバー表示非表示(スマホ版)
  const [isOpen, setIsOpen] = useState(true);

  /**
   * メニューバーを開ける.
   */
  const openMenu = useCallback(() => {
    setIsOpen(true);
  }, []);

  /**
   * メニューバーを閉じる.
   */
  const closeMenu = () => {
    setIsOpen(false);
  };

  /**
   * 画面切り替えでメニュー閉じる.
   */
  useEffect(() => {
    setIsOpen(false);
  }, [router.pathname]);

  useEffect(() => {
    //現在のパス
    const path = router.pathname;

    //仮登録、登録、ログインページ、トップページは除外
    if (path.includes("/auth/") || path === "/") {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  }, [router.pathname]);

  return (
    <div className="flex flex-col min-h-screen relative">
      <LoginIdProvider>
        <RestaurantListProvider>
          <LoginChecker>
            <Header openMenu={openMenu} />
            <div className="flex flex-1 relative">
              {/* デスクトップ用メニュー */}
              {showMenu && (
                <div className="lg:block md:block hidden">
                  <MenuBar />
                </div>
              )}
              {/* スマホ用メニュー */}
              {isOpen && (
                <div
                  className="bg-black bg-opacity-70 w-full h-full absolute top-0 left-0 z-30 duration-300 md:hidden"
                  onClick={closeMenu}
                ></div>
              )}
              <div className="z-40">
                <div
                  className={`${
                    isOpen ? "right-0" : "-right-full"
                  } fixed top-0 h-full overflow-hidden duration-300 md:hidden`}
                >
                  <div className="h-16 bg-white relative border-b-4 border-basic">
                    <button
                      onClick={closeMenu}
                      className="absolute top-5 right-5"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <MenuBar />
                </div>
              </div>

              <main className="flex-1">{children}</main>
            </div>

            <div className="relative bottom-0 left-0 w-full">
              <Footer />
            </div>
          </LoginChecker>
        </RestaurantListProvider>
      </LoginIdProvider>
    </div>
  );
});
