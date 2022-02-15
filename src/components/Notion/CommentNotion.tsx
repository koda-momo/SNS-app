import { FC, useCallback, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import router from "next/router";
import axios from "axios";
import toast from "react-hot-toast";

import { returnCodeToBr } from "../../utils/methods";
import { JAVA_API_URL } from "../../utils/const";
import type { notion } from "../../types/type";
import { loginIdContext } from "../../providers/LoginIdProvider";

export type Props = {
  notification: notion; //通知内容
  type: "つぶやき" | "レビュー" | "コメント"; //タイプ
};

/**
 * コメント通知用コンポーネント.
 * @param props - props
 * @returns ユーザがコメントしてきた際の通知を表示
 */
export const CommentNotion: FC<Props> = (props) => {
  const { notification, type } = props;

  //ログインID
  const { hash } = useContext(loginIdContext);

  /**
   * コメントされた投稿の詳細画面に遷移.
   * @param id - コメントID入る
   */
  const goDetailPage = useCallback(
    async (id: number) => {
      //投稿にコメントした場合もURLで遷移先を決定
      try {
        const res = await axios.get(`${JAVA_API_URL}/comment/${id}/${hash}`);
        //メッセージ内容
        const responseMessage = res.data.message;
        //タイムラインのコメントに対するいいね
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
          toast.error("投稿かコメントが削除された可能性があります");
        }
      } catch (e) {
        toast.error("投稿かコメントが削除された可能性があります");
      }
    },
    [hash],
  );

  return (
    <>
      <div className="p-5 lg:ml-5">
        <div className="flex">
          <span className="text-3xl text-yellow-600 md:mt-14 mt-10">
            <i className="fas fa-comment"></i>
          </span>
          <span className="lg:ml-5 ml-3 mt-5 cursor-pointer hover:opacity-50">
            <Link href={`/user/${notification.userId}`}>
              <a>
                <Image
                  src={`/image/userIcon/${notification.userPhotoPath}`}
                  width={100}
                  height={100}
                  alt="icon"
                  className="rounded-full"
                />
              </a>
            </Link>
          </span>
          <div
            className="lg:text-xl text-base py-3 lg:ml-7 ml-3 cursor-pointer hover:opacity-50"
            onClick={() => goDetailPage(notification.id)}
          >
            {notification.accountName}
            さんがあなたの{type}投稿にコメントしました
            <div className="text-base py-5 w-8/12 text-text-brown break-all">
              {returnCodeToBr(notification.comment)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
