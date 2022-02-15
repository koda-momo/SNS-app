import axios from "axios";

/**
 * useSWRで用いるfetch関数.
 *
 * @remarks
 * useSWRの第一引数に渡したURLが引数に渡ってくる
 * _app.tsxで共通の関数として定義している
 * @param url - APIのURL
 */
export const fetcher = async (url: string) => {
  if (url.includes("NaN") || url.includes("undefined")) {
    return;
  }
  const result = await axios.get(url);
  return result.data;
};