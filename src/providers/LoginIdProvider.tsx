import { createContext, FC, ReactNode } from "react";
import Cookie from "universal-cookie";

//contextを使用する
export const loginIdContext = createContext<{
  hash: string;
  loginId: number;
}>({ hash: "", loginId: 0 });

type Props = {
  children: ReactNode;
};

/**
 * contextでログインIDを渡すコンポーネント.
 * @param props - props
 * @returns ハッシュ値とログインID
 */
export const LoginIdProvider: FC<Props> = (props) => {
  const { children } = props;

  //cookie
  const cookie = new Cookie();
  // cookieからハッシュ値を取得
  const hash: string = cookie.get("hash");
  // cookieからユーザーIDを取得
  const loginId: number = cookie.get("loginId");

  return (
    <loginIdContext.Provider value={{ hash, loginId }}>
      {children}
    </loginIdContext.Provider>
  );
};
