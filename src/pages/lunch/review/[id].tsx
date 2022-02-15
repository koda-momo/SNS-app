import { useContext, useEffect } from "react";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import toast from "react-hot-toast";
import Cookies from "universal-cookie";

import { ReviewCard } from "../../../components/Lunch/ReviewCard";
import { CommentList } from "../../../components/Lunch/CommentList";
import { SubHeader } from "../../../components/Layout/SubHeader";
import type { LunchReview } from "../../../types/type";
import { loginIdContext } from "../../../providers/LoginIdProvider";
import { JAVA_API_URL } from "../../../utils/const";
import { useSWRReviews } from "../../../hooks/useSWRReviews";
import { fetcher } from "../../../utils/fetcher";
import { getReviewById } from "../../../utils/lunch";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

/**
 * レビュー詳細を表示するページ.
 *
 * @returns レビュー詳細を表示する画面
 */
const ReviewDetail: NextPage<Props> = (props) => {
  const { initialData } = props;
  const router = useRouter();

  // レビューIDをURLから取得
  const reviewId = Number(router.query.id);

  // ログインユーザーのハッシュ値
  const { hash } = useContext(loginIdContext);

  const { reviewsMutate } = useSWRReviews(hash);

  // データ取得
  const { data, error, mutate } = useSWR(
    `${JAVA_API_URL}/review/detail/${reviewId}/${hash}`,
    fetcher,
    { fallbackData: initialData },
  );

  /**
   * 通知画面から削除された投稿に遷移した場合のメソッド.
   */
  useEffect(() => {
    if (data?.message === "そのレビューは存在しません") {
      toast.error("投稿が削除された可能性があります");
      router.back();
    } else {
      return;
    }
  }, [data?.message, router]);

  if (!error && !data) {
    return (
      <div className="w-full flex justify-center pt-10">
        <div className="animate-spin h-8 w-8 bg-basic rounded-xl"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-10 text-center">
        データを取得できませんでした
      </div>
    );
  }

  // レビュー情報をデータから抽出
  const review: LunchReview = data.review;

  // レビューに対するコメント一覧をデータから抽出
  const commentList = data.commentList;

  return (
    <div className="flex">
      <div className="flex-1">
        <SubHeader title="レビュー詳細" />
        <div
          className="cursor-pointer ml-5 mt-2"
          onClick={() => {
            router.back();
          }}
        >
          ←戻る
        </div>
        {review && (
          <>
            <ReviewCard
              {...review}
              type="詳細"
              hasRestaurantInfo={true}
              reviewsMutate={reviewsMutate}
            />
            {/* コメント部分 */}
            <div className="w-full">
              <CommentList commentList={commentList} success={mutate} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// SSR
/**
 * サーバー側でデータを取得(SSR).
 */
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const reviewId = Number(ctx.query.id);
  // サーバー側でクッキー取得
  const cookies = new Cookies(ctx.req.headers.cookie);
  const hash = cookies.get("hash");

  const initialData = await getReviewById(reviewId, hash);

  if (initialData.status === 400 || initialData.status === "error") {
    return { notFound: true }; // 存在しないidのパスが打たれた場合は404を返す
  }

  return {
    props: { initialData },
  };
};

export default ReviewDetail;
