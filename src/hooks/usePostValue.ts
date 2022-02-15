import { useCallback, useContext, useEffect, useState } from "react";
import useSWR from "swr";

import { Option } from "../types/type";
import { loginIdContext } from "../providers/LoginIdProvider";
import { JAVA_API_URL } from "../utils/const";

/**
 * テキストエリアデータ取得用hook.
 * @returns
 */
export const usePostValue = (starOptions: Array<Option>) => {
  //入力テキストの内容を格納するstate
  const [post, setPost] = useState<string>("");

  //入力テキスト残り文字数
  const [postLength, setPostLength] = useState<number>(0);

  // 選択した星の数を格納するstate
  const [star, setStar] = useState<Option>(starOptions[0]);

  // ログイン中のユーザーidを取得
  const { hash } = useContext(loginIdContext);
  const { loginId } = useContext(loginIdContext);

  /**
   * リアルタイムに文字数をカウントしてくれる.
   */
  useEffect(() => {
    setPostLength(140 - post.length);
  }, [post.length]);

  /**
   * 入力テキストの内容をstateに格納する.
   */
  const inputPost = useCallback((e) => {
    setPost(e.target.value);
  }, []);

  /**
   * APIを使用して画像データ取得.
   */
  const { data } = useSWR(`${JAVA_API_URL}/user/${loginId}/${hash}`);
  // 個人情報をdataから抽出
  const [userPhoto] = useState<string>(data?.user.userPhotoPath);

  return { post, setPost, inputPost, postLength, star, setStar, userPhoto };
};
