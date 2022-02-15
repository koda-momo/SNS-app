import { FC, useCallback, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";

import type { notion } from "../../types/type";
import { returnCodeToBr } from "../../utils/methods";
import { loginIdContext } from "../../providers/LoginIdProvider";
import { JAVA_API_URL } from "../../utils/const";

//コメント数・対象の投稿IDを受け取る
export type Props = {
  notification: notion; //通知内容
  type: "つぶやき" | "レビュー" | "コメント"; //タイプ
  sentence: string; //ユーザが反応した投稿の内容
  url?: string; //投稿詳細URL(コメントに対するいいねの際はnull)
};

/**
 * いいね通知用コンポーネント.
 * @param props - props
 * @returns ユーザがいいねしてきた際の通知を表示
 */
export const LikeNotion: FC<Props> = (props) => {
  const { notification, type, sentence, url } = props;

  //ログインID
  const { hash } = useContext(loginIdContext);

  //ルーターリンク
  const router = useRouter();
  /**
   * いいねされた投稿の詳細画面に遷移.
   * @param id - コメントに対するいいねの際は対象のコメントIDが入る
   */
  const goDetailPage = useCallback(
    async (id: number) => {
      //本投稿に対するいいねはpropsのURLにそのまま遷移
      if (url) {
        router.push(url);
      } else {
        //コメントにたいするいいね
        //APIを使用して遷移先を判断
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
      }
    },
    [hash, router, url],
  );

  //いいねを表示
  return (
    <>
      <div className="p-5 lg:ml-5">
        <div className="flex">
          <span className="text-3xl mt-2 text-red-500">
            <i className="fas fa-heart"></i>
          </span>
          <span className="lg:ml-5 ml-3 cursor-pointer hover:opacity-50">
            <Link href={`/user/${notification.userId}`}>
              <a>
                <Image
                  src={`/image/userIcon/${notification.userPhotoPath}`}
                  width={50}
                  height={50}
                  alt="icon"
                  className="rounded-full"
                />
              </a>
            </Link>
          </span>
        </div>
        <div
          className="lg:text-xl text-base pt-3 pb-3 ml-16 cursor-pointer hover:opacity-50"
          onClick={() => goDetailPage(notification.parentCommentId)}
        >
          {notification.accountName}
          さんがあなたの{type}投稿にいいねしました
          <div className="text-base py-5 w-8/12 opacity-60 break-all">
            {returnCodeToBr(sentence)}
          </div>
        </div>
      </div>
    </>
  );
};
