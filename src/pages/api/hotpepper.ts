// jsonp形式のデータをfetchするパッケージ
import type { NextApiRequest, NextApiResponse } from "next";
import { HOTPEPPER_URL } from "../../utils/const";

/**
 * ホットペッパーAPIを叩くための簡易API.
 * @param req - リクエストパラメータ
 * @param res - レスポンス
 */
const Hotpepper = async (req: NextApiRequest, res: NextApiResponse) => {
  // サーバー側でのみ使用できる定数、API_KEYを使用
  // サーバー側でAPIを叩いているため、jsonで取得してもCORSエラーは発生しない
  let url = HOTPEPPER_URL;

  // クエリパラメータから店名を取得
  const { name_any } = req.query;
  if (name_any) {
    url += "&name_any=" + name_any;
    url = encodeURI(url); // URLには使用できない文字をできる文字に変換する
  }
  // クエリパラメータからホットペッパーIDを取得
  const { hotpepperId } = req.query;
  if (hotpepperId) {
    url += "&id=" + hotpepperId;
    url = encodeURI(url); // URLには使用できない文字をできる文字に変換する
  }

  // fetchでホットペッパーAPIを叩く
  const response = await fetch(url);
  const data = await response.json();
  
  if (data.results.shop) {
    const result = data.results.shop;
  
    // レスポンスを定義
    res.status(200).json({ shops: result }); // resultの内容をshopsという名前で渡す
  } else {
    // レスポンスを定義
    res.status(400).json({ message: "エラーが発生しました" }); 
  }
};

export default Hotpepper;