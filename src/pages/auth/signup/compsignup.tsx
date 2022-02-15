import type { NextPage } from "next";
import { LinkComp } from "../../../components/Form/LinkComp";

/**
 * 本会員登録完了ページ.
 * @returns 本会員登録が完了した際に表示するページ
 */
const CompSignUp: NextPage = () => {
  return (
    <>
      <div className="border-solid  border-2 border-bgc-200 m-10 h-48 shadow-sm  text-center">
        <div className="text-xl sm:text-3xl lg:text-3xl text-text-brown mt-5 font-bold ">
          会員登録が完了しました
        </div>
        <div className="mt-3">
          <LinkComp
            url="/auth/login"
            linkText="ログインページはコチラから"
          ></LinkComp>
        </div>
      </div>
    </>
  );
};
export default CompSignUp;
