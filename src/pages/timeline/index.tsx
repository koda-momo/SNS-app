import { useCallback, useContext } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { SubHeader } from "../../components/Layout/SubHeader";
import { CommentIcon } from "../../components/Button/CommentIcon";
import { FavoBtn } from "../../components/Button/FavoBtn";
import { TrashBtn } from "../../components/Button/TrashBtn";
import { PostBtn } from "../../components/Button/PostBtn";
import type { Timeline } from "../../types/type";
import { loginIdContext } from "../../providers/LoginIdProvider";
import { useSWRTimeline } from "../../hooks/useSWRTimeline";
import { returnCodeToBr } from "../../utils/methods";

/**
 * タイムラインページ.
 * @returns つぶやきの一覧が流れてくるページ
 */
const TimelinePage: NextPage = () => {
  //ログインID
  const { hash } = useContext(loginIdContext);
  const { loginId } = useContext(loginIdContext);

  // 投稿一覧を再検証・再取得する関数をhooksから取得
  const { data, error, loadMoreTimeline, timelineMutate, isLast } =
    useSWRTimeline(hash);

  /**
   * タイムラインの情報を更新するメソッド.
   *
   * @remarks
   * 投稿が成功すると呼ばれる。
   */
  const updateData = useCallback(() => {
    timelineMutate(); // タイムライン一覧を再検証・再取得する
  }, [timelineMutate]);

  //初期値エラー
  if (!error && !data) {
    return (
      <div className="flex justify-center pt-10 w-full">
        <div className="animate-spin h-8 w-8 bg-basic rounded-xl"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-10 text-center">
        データが取得できませんでした
      </div>
    );
  }

  //つぶやき0件の場合
  if (data?.[0].TimelineList?.[0] === undefined) {
    return (
      <div className="w-full p-10 text-center">
        つぶやきが1件もありません🙇‍♀️
        <div>
          <PostBtn success={updateData} />
        </div>
      </div>
    );
  }

  //HTMLコーナー
  return (
    <>
      {/* サブヘッダー */}
      <SubHeader title="つぶやき一覧" />
      {/* タイムラインゾーン */}
      {data &&
        // dataはページごとの連想配列の配列
        data.map((pageData) =>
          pageData?.TimelineList.map((timelime: Timeline) => {
            return (
              <div
                key={timelime.id}
                className="flex border border-t-0 border-gray-200"
              >
                <div className="rounded-full w-1/5 text-center ml-5 pt-10 cursor-pointer hover:opacity-50">
                  <Link href={`/user/${timelime.userId}`}>
                    <a>
                      <Image
                        src={`/image/userIcon/${timelime.userPhotoPath}`}
                        width={100}
                        height={100}
                        alt="icon"
                        className="rounded-full"
                      />
                    </a>
                  </Link>
                </div>
                <div className="w-4/5">
                  <div className="cursor-pointer hover:opacity-50">
                    <Link href={`timeline/${timelime.id}`}>
                      <a>
                        <div className="text-xl font-extrabold pt-10 pl-3">
                          {timelime.accountName}
                        </div>
                        <div className="pt-5 pb-5 pl-5 w-8/12 break-all">
                          {returnCodeToBr(timelime.sentence)}
                        </div>
                      </a>
                    </Link>
                  </div>

                  <div className="w-full text-right py-3">
                    <CommentIcon
                      commentCount={timelime.commentCount}
                      postId={timelime.id}
                      success={updateData}
                      title="つぶやきへのコメント"
                    />
                    <FavoBtn
                      postId={timelime.id}
                      favoCount={timelime.likeCount}
                      isFavo={timelime.myLike}
                      type="タイムライン"
                      success={updateData}
                    />
                    {Number(loginId) === timelime.userId && (
                      <TrashBtn
                        postId={timelime.id}
                        type="タイムライン"
                        success={updateData}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          }),
        )}

      {!isLast ? (
        <div
          className="text-text-brown text-center my-5 cursor-pointer hover:text-basic"
          onClick={loadMoreTimeline}
        >
          過去の投稿を見る…
        </div>
      ) : (
        <div className="text-text-brown text-center my-5 ">
          最後まで読み込みました
        </div>
      )}

      <div>
        <PostBtn success={updateData} />
      </div>
    </>
  );
};

export default TimelinePage;
