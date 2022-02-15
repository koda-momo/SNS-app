import { NextPage } from "next";
import Link from "next/link";
import { SubHeader } from "../../components/Layout/SubHeader";

/**
 * ラーニングセンター基本情報画面.
 * @returns ラーニングセンターの基本情報の照会ページ
 */
const Info: NextPage = () => {
  return (
    <>
      <div className="flex">
        <div className="w-full">
          <SubHeader title="ラーセン基本情報" />
          {/* 基本情報 */}
          <div className="border-solid  border-2 border-bgc-200 m-5 shadow rounded-md text-center">
            <div className="mt-3 text-xl font-bold">第2ラーニングセンター</div>

            <div className="mb-5">
              <div>〒160-0022 東京都新宿区新宿2-5-12 FORECAST新宿AVENUE8階</div>
              <div>東京メトロ丸ノ内線等「新宿三丁目」駅 徒歩3分</div>
              <div>解放時間:毎週土曜日9:00-18:00</div>
            </div>
          </div>
          <div className="border-solid  border-2 border-bgc-200 m-5 shadow rounded-md text-center">
            <div className="mt-3 text-xl font-bold">第1ラーニングセンター</div>

            <div className="mb-5">
              <div>〒160-0022 東京都新宿区新宿5-15-5 新宿三光町ビル9F</div>
              <div>東京メトロ丸ノ内線等「新宿三丁目」駅 徒歩5分</div>
            </div>
          </div>
          <div className="border-solid  border-2 border-bgc-200 m-5 shadow rounded-md text-center">
            <div className="mt-3 text-xl font-bold">本社</div>

            <div className="mb-5">
              <div>〒160-0022 東京都新宿区新宿4-3-25 TOKYU REIT新宿ビル8F </div>
              <div>東京メトロ丸ノ内線等「新宿三丁目」駅 徒歩1分</div>
              <div>JR山手線「新宿」駅 徒歩4分</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Info;
