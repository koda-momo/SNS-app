import { FC, memo, Fragment, useCallback } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";

import { Button } from "../Button/Button";
import { TextArea } from "../Form/TextArea";
import { SelectBox } from "../Form/SelectBox";
import { starOptions } from "../../utils/options";
import { usePostValue } from "../../hooks/usePostValue";
import { useTimelinePost } from "../../hooks/useTimelinePost";
import { useTimelineCommentPost } from "../../hooks/useTimelineCommentPost";
import { useReviewPost } from "../../hooks/useReviewPost";
import { useReviewCommentPost } from "../../hooks/useReviewCommentPost";
import toast from "react-hot-toast";

type Props = {
  isOpen: boolean; // モーダルが開いているかどうか
  closeModal: () => void; // モーダルを閉じるメソッド
  title: "レビュー" | "つぶやき" | "つぶやきへのコメント" | "レビューへのコメント"; // レビュー/つぶやき/コメント
  restaurantId?: number; // 店のID(レビュー投稿なら渡ってくる)。投稿の際にAPIに渡す。
  postId?: number; // タイムラインもしくはレビューのID(コメント投稿なら渡ってくる)。投稿の際にAPIに渡す
  success: () => void; //投稿完了後、自動で更新したい場合は更新のメソッドを渡す
};

/**
 * つぶやきもしくはレビューもしくはコメントを投稿するためのモーダルのコンポーネント.
 */
export const PostModal: FC<Props> = memo((props) => {
  const {
    isOpen,
    closeModal,
    title,
    restaurantId = 0,
    postId = 0,
    success,
  } = props;

  //入力データ・入力データセット・入力データの内容をstateに格納・入力データ文字数
  //星・set星・ユーザアイコン
  const { post, setPost, inputPost, postLength, star, setStar, userPhoto } =
    usePostValue(starOptions);
  //タイムライン投稿用
  const { timelinePost } = useTimelinePost();
  //タイムラインコメント投稿用
  const { timelineCommentPost } = useTimelineCommentPost();
  //レビュー投稿用
  const { reviewPost } = useReviewPost();
  //レビューコメント投稿用
  const { reviewCommentPost } = useReviewCommentPost();

  /**
   * 入力内容を投稿するメソッド.
   * @remarks API完成したらこのメソッド内で送信.
   * titleによって投稿するAPIを変える。
   */
  const sendPost = useCallback(() => {
    //post内容から空欄を除いたもの
    const noSpace = post.trim();

    if (post === "" || noSpace === "") {
      toast.error("文字を入力して下さい");
      return;
    }
    if (post.length > 140) {
      toast.error(`${title}は140文字以内にして下さい`);
      return;
    }

    //レビュー投稿
    if (title === "レビュー") {
      reviewPost(post, star, restaurantId, success);
      closeModal();
      setPost("");
      setStar(starOptions[0]);
    }

    if (title === "レビューへのコメント") {
      reviewCommentPost(postId, post, success);
      closeModal();
      setPost("");
    }

    //タイムライン投稿
    if (title === "つぶやき") {
      timelinePost(post, success);
      closeModal();
      setPost("");
    }

    if (title === "つぶやきへのコメント") {
      timelineCommentPost(postId, post, success);
      closeModal();
      setPost("");
    }
  }, [
    closeModal,
    post,
    postId,
    restaurantId,
    reviewCommentPost,
    reviewPost,
    setPost,
    star,
    setStar,
    success,
    timelineCommentPost,
    timelinePost,
    title,
  ]);

  /**
   * 投稿をキャンセルするメソッド.
   */
  const canselPost = useCallback(() => {
    closeModal();
    setPost("");
    setStar(starOptions[0]);
  }, [closeModal, setPost, setStar]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={canselPost}
        >
          {/* モーダルの背景を暗くする */}
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* モーダルを画面の中央に配置するための要素 */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            {/* モーダルの中身部分 */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-lg sm:max-w-2xl p-10 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-bold leading-6 text-text-brown text-center"
                >
                  {title}を投稿
                </Dialog.Title>
                {/* レビューの登録なら、星の数を選択してもらう */}
                <div className="mt-2">
                  <div className="mt-10">
                    {title === "レビュー" && (
                      <div className="flex gap-3 items-center mb-3">
                        評価: 星
                        <SelectBox
                          selectedOption={star}
                          select={setStar}
                          options={starOptions}
                        />
                        つ
                      </div>
                    )}
                    <div className="flex text-center justify-center flex-col md:flex-row mt-10">
                      <div>{title}内容を下記に入力して下さい</div>
                      <div>(140字以内)</div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row mt-5">
                    {userPhoto ? (
                      <div>
                        <Image
                          src={`/image/userIcon/${userPhoto}`}
                          width={100}
                          height={100}
                          alt="icon"
                          className="rounded-full"
                        />
                      </div>
                    ) : (
                      <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center pl-5 mb-5">
                        No Image
                      </div>
                    )}

                    <div className="sm:mx-10">
                      <div
                        className={`${
                          postLength < 0 && "text-red-700"
                        } text-right`}
                      >
                        残り文字数：{postLength}
                      </div>
                      <TextArea
                        value={post}
                        rows={10}
                        cols={45}
                        onChange={inputPost}
                      />
                    </div>
                  </div>
                </div>
                {/* 投稿/キャンセルのボタン */}
                <div className="mt-7 flex gap-10 justify-center">
                  <Button label={"投稿"} onClick={sendPost} />
                  <Button
                    backgroundColor="#f6f0ea"
                    color="#622d18"
                    label={"キャンセル"}
                    onClick={canselPost}
                  />
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
});
