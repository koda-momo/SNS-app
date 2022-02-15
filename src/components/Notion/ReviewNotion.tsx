import { FC } from "react";

import { CommentNotion } from "./CommentNotion";
import { LikeNotion } from "./LikeNotion";
import type { notion } from "../../types/type";

export type Props = {
  notification: notion; //通知の内容
};

/**
 * レビューの通知表示コンポ―ネント.
 * @param props - props
 * @returns レビューに対する通知→コメントorいいね
 */
export const ReviewNotion: FC<Props> = (props) => {
  const { notification } = props;

  return (
    <>
      <>
        {!notification.comment && (
          <LikeNotion
            notification={notification}
            type="レビュー"
            sentence={notification.reviewSentence}
            url={`/lunch/review/${notification.reviewId}`}
          />
        )}
        {notification.comment && (
          <CommentNotion notification={notification} type="レビュー" />
        )}
      </>
    </>
  );
};
