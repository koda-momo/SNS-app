import { FC, memo, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { FavoBtn } from "../Button/FavoBtn";
import { TrashBtn } from "../Button/TrashBtn";
import type { Comment } from "../../types/type";
import { loginIdContext } from "../../providers/LoginIdProvider";
import { getFormattedDate, returnCodeToBr } from "../../utils/methods";

type Props = {
  commentList: Array<Comment>; //コメントリスト
  success: () => void; // レビュー詳細の更新mutate
};

/**
 * レビュー詳細ページのコメントコンポーネント.
 */
export const CommentList: FC<Props> = memo((props) => {
  const { commentList, success } = props;

  //ルーターリンク
  const router = useRouter();

  // ログインユーザーID
  const { loginId } = useContext(loginIdContext);

  /**
   * 画像クリックで投稿ユーザ情報ページに飛ぶ.
   * @param userId - 投稿者ID
   */
  const goUserPage = (userId: number) => {
    router.push(`/user/${userId}`);
  };

  return (
    <div className="border border-t-0 border-gray-200">
      {commentList?.length > 0 && (
        <div>
          {commentList.map((comment: Comment) => (
            <div key={comment.id} className="flex">
              <div className="w-1/5 text-center pt-5 cursor-pointer hover:opacity-50">
                <Image
                  src={`/image/userIcon/${comment.userPhotoPath}`}
                  width={100}
                  height={100}
                  alt="icon"
                  onClick={() => {
                    goUserPage(comment.userId);
                  }}
                  className="rounded-full"
                />
              </div>
              <div className="w-4/5">
                <div className="text-xl font-extrabold py-3 ml-3">
                  {comment.accountName}
                </div>
                <div className="pt-5 pb-5 pl-5 w-10/12 break-all">
                  {returnCodeToBr(comment.comment)}
                </div>
                <div className="w-full text-right py-3 pr-5">
                  <span className="mr-7">
                    コメント日時：
                    {getFormattedDate(new Date(comment.actionedTime))}
                  </span>
                  <FavoBtn
                    postId={comment.id}
                    favoCount={comment.commentLikeCount}
                    success={success} // レビュー詳細の更新mutate
                    isFavo={comment.myLike}
                    type="レビューコメント"
                  />
                  {Number(loginId) === comment.userId && (
                    <TrashBtn
                      postId={comment.id}
                      success={success} // レビュー詳細の更新mutate
                      type="レビューコメント"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
