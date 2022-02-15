import { FC, memo } from "react";
import { useCallback, useContext } from "react";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import Image from "next/image";

import { loginIdContext } from "../../providers/LoginIdProvider";
import type { Timeline } from "../../types/type";
import { CommentIcon } from "../Button/CommentIcon";
import { FavoBtn } from "../Button/FavoBtn";
import { TrashBtn } from "../Button/TrashBtn";
import { JAVA_API_URL } from "../../utils/const";
import { getFormattedDate, returnCodeToBr } from "../../utils/methods";

/**
 * タイムライン履歴を表示するカードコンポーネント
 */
export const TimelineHisCard: FC<Timeline> = memo((props) => {
  const {
    id,
    userId,
    accountName,
    userPhotoPath,
    sentence,
    likeCount,
    commentCount,
    postedTime,
    myLike,
  } = props;

  //ログインID
  const { loginId } = useContext(loginIdContext);
  const { hash } = useContext(loginIdContext);

  //ルーターリンク
  const router = useRouter();

  //useSWRConfig() フックから mutate 関数を取得
  const { mutate } = useSWRConfig();

  /**
   * 画像クリックで投稿ユーザ情報ページに飛ぶ.
   * @param userId - 投稿者ID
   */
  const goUserPage = useCallback(
    (userId: number) => {
      router.push(`/user/${userId}`);
    },
    [router],
  );

  /**
   * 押下投稿の詳細に画面遷移.
   * @remarks 受け取った記事IDの詳細画面に遷移
   */
  const goDetailTimelinePage = useCallback(
    (postId: number) => {
      router.push(`/timeline/${postId}`);
    },
    [router],
  );

  /**
   * 履歴表示一覧の情報を更新するメソッド.
   *
   * @remarks
   * 成功すると呼ばれる。
   */
  const updateData = useCallback(() => {
    mutate(`${JAVA_API_URL}/user/${userId}/${hash}`); // 履歴一覧を再検証・再取得する
  }, [hash, mutate, userId]);

  return (
    <div
      key={id}
      className=" border border-t-1 mt-1 border-blue-100text-sm font-medium leading-5 focus:outline-none rounded-xl bg-white relative p-3 "
    >
      <div className="flex flex-col">
        <div className="flex ">
          <div
            className="lg:1/12 cursor-pointer hover:opacity-50"
            onClick={() => {
              goUserPage(userId);
            }}
          >
            <Image
              src={`/image/userIcon/${userPhotoPath}`}
              width={80}
              height={80}
              alt="icon"
              className="rounded-full"
            />
          </div>
          <div
            className="ml-4 hover:bg-coolGray-100 cursor-pointer hover:opacity-50"
            onClick={() => {
              goUserPage(userId);
            }}
          >
            <div className="text-xl font-extrabold py-3">{accountName}</div>
          </div>
        </div>
        <div
          className="lg:ml-20 my-2 break-all hover:bg-coolGray-100 cursor-pointer hover:opacity-50"
          onClick={() => {
            goDetailTimelinePage(id);
          }}
        >
          {returnCodeToBr(sentence)}
        </div>
      </div>

      <div className="flex flex-col items-end gap-3 sm:flex-row justify-end">
        <span className="mr-7">
          つぶやき日時:
          {getFormattedDate(new Date(postedTime))}
        </span>
        <div>
          <CommentIcon
            commentCount={commentCount}
            postId={id}
            success={updateData}
            title="つぶやきへのコメント"
          />
          <FavoBtn
            postId={id}
            favoCount={likeCount}
            isFavo={myLike}
            type="タイムライン"
            success={updateData}
          />
          {Number(loginId) === userId && (
            <TrashBtn postId={id} type="タイムライン" success={updateData} />
          )}
        </div>
      </div>
    </div>
  );
});
