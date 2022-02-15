import { FC, memo } from "react";
import { useCallback, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";

import { loginIdContext } from "../../providers/LoginIdProvider";
import type { CommentHis } from "../../types/type";
import { JAVA_API_URL } from "../../utils/const";
import { getFormattedDate, returnCodeToBr } from "../../utils/methods";

/**
 * いいねコメント履歴を表示するコンポーネント
 */
export const LikedCommentHis: FC<CommentHis> = memo((props) => {
  const { id, userId, accountName, userPhotoPath, comment, actionedTime } =
    props;

  //ハッシュ値
  const { hash } = useContext(loginIdContext);

  //ルーターリンク
  const router = useRouter();

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
    async (id: number) => {
      //APIを使用して遷移先を判断
      try {
        const res = await axios.get(`${JAVA_API_URL}/comment/${id}/${hash}`);
        //メッセージ内容
        const responseMessage = res.data.message;
        if (
          responseMessage ===
          "このコメントがあるタイムライン詳細の検索に成功しました"
        ) {
          router.push(`/timeline/${res.data.timeline.id}`);
        } else if (
          //レビューのコメントに対するいいね
          responseMessage ===
          "このコメントがあるレビュー詳細の検索に成功しました"
        ) {
          router.push(`/lunch/review/${res.data.review.id}`);
        } else {
          toast.error(responseMessage);
        }
      } catch (e) {
        toast.error("投稿が見つかりませんでした。");
      }
    },
    [hash, router],
  );

  return (
    <div
      key={id}
      className=" border border-t-1 mt-1 border-blue-100text-sm font-medium leading-5 focus:outline-none rounded-xl bg-white relative p-3 "
    >
      <div className="flex flex-col">
        <div className="flex">
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
              goDetailTimelinePage(id);
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
          {returnCodeToBr(comment)}
        </div>
      </div>
      <div className="flex justify-end">
        <span>
          コメント日時:
          {getFormattedDate(new Date(actionedTime))}
        </span>
      </div>
    </div>
  );
});
