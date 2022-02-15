import { FC, memo, useContext } from "react";

import { loginIdContext } from "../../providers/LoginIdProvider";
import { useFavo } from "../../hooks/useFavo";

type Props = {
  postId: number; //投稿ID
  favoCount: number; //お気に入り数
  isFavo: boolean; //お気に入りしているかどうか
  type: string; //レビューかつぶやきか
  success: () => void; //自動リロード用メソッド
};

/**
 * つぶやきをお気に入りに登録するボタン.
 */
export const FavoBtn: FC<Props> = memo((props) => {
  //ログインID
  const { hash } = useContext(loginIdContext);

  //props
  const { postId, favoCount, isFavo, type, success } = props;

  // カスタムフックを使用する
  const { favo, disabled } = useFavo(postId, type, success, hash);

  return (
    <>
      <button
        type="button"
        className="pr-10 focus:outline-none"
        onClick={favo}
        disabled={disabled}
      >
        {isFavo ? (
          <>
            <i className="fas fa-heart text-red-500"></i>
            <span className="pl-1">{favoCount}</span>
          </>
        ) : (
          <>
            <i className="fas fa-heart text-gray-500 hover:text-red-500"></i>
            <span className="pl-1">{favoCount}</span>
          </>
        )}
      </button>
    </>
  );
});
