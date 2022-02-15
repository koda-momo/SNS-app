import type { NextPage } from "next";
import { LinkComp } from "../../components/Form/LinkComp";

/**
 * パスワード変更完了画面.
 * @returns パスワードの変更が完了した際に表示する画面
 */
const CompUpdatePass: NextPage = () => {
  return (
    <>
      <div className="border-solid  border-2 border-bgc-200 m-10 h-48 shadow-sm  text-center">
        <div className="text-lg sm:text-3xl lg:text-3xl text-text-brown mt-5 font-bold ">
          パスワードの変更が完了しました
        </div>
        <div className="mt-3">
          <LinkComp
            linkText="ログインページはコチラから"
            url="/auth/login"
          ></LinkComp>
        </div>
      </div>
    </>
  );
};
export default CompUpdatePass;
