import { FC, memo, useContext } from "react";
import Image from "next/image";
import Link from "next/link";

import { FavoBtn } from "../Button/FavoBtn";
import { TrashBtn } from "../Button/TrashBtn";
import type { Comment } from "../../types/type";
import { loginIdContext } from "../../providers/LoginIdProvider";
import { getFormattedDate, returnCodeToBr } from "../../utils/methods";

type Props = {
  commentList: Array<Comment>; //コメントリスト
  success: () => void; //成功したときにデータ再読み込み
};

/**
 * タイムライン詳細ページのコメントコンポーネント.
 */
export const CommentList: FC<Props> = memo((props) => {
  const { commentList, success } = props;

  //ログインID
  const { loginId } = useContext(loginIdContext);

  return (
    <>
      {commentList.map((value, key) => (
        <div key={key} className="flex border border-t-0 border-gray-200 ">
          <div className="w-1/5 text-center pt-5 cursor-pointer hover:opacity-50">
            <Link href={`/user/${value.userId}`}>
              <a>
                <Image
                  src={`/image/userIcon/${value.userPhotoPath}`}
                  width={100}
                  height={100}
                  alt="icon"
                  className="rounded-full"
                />
              </a>
            </Link>
          </div>
          <div className="w-4/5">
            <div className="text-xl font-extrabold py-3 ml-3">
              {value.accountName}
            </div>
            <div className="pt-5 pb-5 pl-5 w-8/12 break-all">
              {returnCodeToBr(value.comment)}
            </div>
            <div className="text-right pb-5">
              <div className="flex flex-col items-end gap-3 sm:flex-row justify-end mr-10 mt-5">
                <div className="mr-5">
                  投稿日時： {getFormattedDate(new Date(value.actionedTime))}
                </div>

                <div>
                  <FavoBtn
                    postId={value.id}
                    favoCount={value.commentLikeCount}
                    success={success}
                    isFavo={value.myLike}
                    type="タイムラインコメント"
                  />
                  {Number(loginId) === value.userId && (
                    <TrashBtn
                      postId={value.id}
                      success={success}
                      type="タイムラインコメント"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
});
