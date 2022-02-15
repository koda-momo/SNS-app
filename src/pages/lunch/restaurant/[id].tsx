import { useCallback, useContext, useEffect } from "react";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";
import Cookie from "universal-cookie";

import { Button } from "../../../components/Button/Button";
import { PostModal } from "../../../components/Modal/PostModal";
import { ReviewList } from "../../../components/Lunch/ReviewList";
import { RestaurantDetailContainer } from "../../../components/Lunch/RestaurantDetailContainer";
import { SubHeader } from "../../../components/Layout/SubHeader";
import type { Restaurant } from "../../../types/type";
import { JAVA_API_URL } from "../../../utils/const";
import { fetcher } from "../../../utils/fetcher";
import { getAllRestaurantsIds, getRestaurantData } from "../../../utils/lunch";
import { loginIdContext } from "../../../providers/LoginIdProvider";
import { useSWRReviews } from "../../../hooks/useSWRReviews";
import { useModal } from "../../../hooks/useModal";

//スクロールバーを隠すCSS
const HiddenScrollBar = styled.div`
  ::-webkit-scrollbar {
    display: none;
  }
`;

type Props = InferGetStaticPropsType<typeof getStaticProps>;

/**
 * お店情報の詳細を表示するページ.
 *
 * @returns お店情報の詳細を表示する画面
 */
const RestaurantDetail: NextPage<Props> = (props) => {
  const { initialData } = props;
  const router = useRouter();

  // ログインユーザーのハッシュ値
  const { hash } = useContext(loginIdContext);

  // レビュー一覧を再検証・再取得する関数をhooksから取得
  const { reviewsMutate } = useSWRReviews(hash);

  // モーダルを開閉するカスタムフックを使用
  const { modalStatus, setModalStatus, openModal, closeModal } = useModal();

  // idをURLから取得
  const restaurantId = Number(router.query.id);

  // データを取得
  const { data, error, mutate } = useSWR(
    `${JAVA_API_URL}/restaurant/${restaurantId}`,
    fetcher,
    { fallbackData: initialData },
  );

  /**
   * 店詳細の情報を更新するメソッド.
   *
   * @remarks
   * レビュー投稿が成功すると呼ばれる。
   */
  const updateData = useCallback(() => {
    reviewsMutate(); // レビュー一覧を再検証・再取得する
    mutate(); // レストラン情報を再検証・再取得する
  }, [mutate, reviewsMutate]);

  useEffect(() => {
    const cookie = new Cookie();
    // 店を追加後の遷移時のみ、モーダルを自動で開く
    if (cookie.get("addFlag") === "true") {
      setModalStatus(true);
      cookie.remove("addFlag");
    }
  }, [setModalStatus]);

  if (!error && !data) {
    return (
      <div className="flex justify-center pt-10 w-full">
        <div className="animate-spin h-8 w-8 bg-basic rounded-xl"></div>
      </div>
    );
  }

  if (error) {
    return <div>データを取得できませんでした</div>;
  }

  // レストラン情報をdataから抽出
  const restaurant: Restaurant = data.restaurant;

  return (
    <>
      <SubHeader title="ランチ店詳細" />
      <div
        className="cursor-pointer m-5"
        onClick={() => {
          router.back();
        }}
      >
        ←戻る
      </div>
      <div className="flex flex-col lg:flex-row">
        {/* メインの店情報表示部分 */}
        <RestaurantDetailContainer restaurant={restaurant} />

        {/* レビューエリア */}
        <div className="w-full lg:w-1/3 mt-10 sm:ml-auto">
          <div className="font-bold ml-3">
            この店へのレビュー
            <span className="ml-5">
              <Button label={"レビュー投稿"} size="sm" onClick={openModal} />
            </span>
          </div>
          <HiddenScrollBar className="overflow-auto h-screen">
            <ReviewList />
          </HiddenScrollBar>
          <PostModal
            isOpen={modalStatus}
            closeModal={closeModal}
            title={"レビュー"}
            restaurantId={restaurantId}
            success={updateData}
          />
        </div>
      </div>
    </>
  );
};

// SSG
//idのとりうる値のリストを返す
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllRestaurantsIds();
  return {
    paths,
    fallback: "blocking",
  };
};

//idに基づいて必要なデータを取得
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const initialData = await getRestaurantData(Number(params?.id));

  if (initialData.status === 400 || initialData.status === "error") {
    return { notFound: true }; // 存在しないidのパスが打たれた場合は404を返す
  }

  return {
    props: {
      initialData,
    },
    revalidate: 10,
  };
};

export default RestaurantDetail;
