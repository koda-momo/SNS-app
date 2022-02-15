import { FC } from "react";

import { CommentNotion } from "./CommentNotion";
import { LikeNotion } from "./LikeNotion";
import type { notion } from "../../types/type";

export type Props = {
  notification: notion; //通知内容
};

/**
 * タイムラインの通知表示コンポ―ネント.
 * @param props - props
 * @returns タイムラインに対する通知→コメントorいいね
 */
export const TimelineNotion: FC<Props> = (props) => {
  const { notification } = props;

  return (
    <>
      {!notification.comment && (
        <LikeNotion
          notification={notification}
          type="つぶやき"
          sentence={notification.timelineSentence}
          url={`/timeline/${notification.timelineId}`}
        />
      )}
      {notification.comment && (
        <CommentNotion notification={notification} type="つぶやき" />
      )}
    </>
  );
};
