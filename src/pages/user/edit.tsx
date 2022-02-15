import {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import Image from "next/image";
import Cookies from "universal-cookie";

import { TextInput } from "../../components/Form/TextInput";
import { Button } from "../../components/Button/Button";
import { Radio } from "../../components/Form/Radio";
import { TextArea } from "../../components/Form/TextArea";
import { PasswordModal } from "../../components/Modal/PasswordModal";
import { useUserEdit } from "../../hooks/useUserEdit";
import { useModal } from "../../hooks/useModal";
import { JAVA_API_URL } from "../../utils/const";
import { UserInfo } from "../../types/type";
import { SubHeader } from "../../components/Layout/SubHeader";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
/**
 * ユーザー情報編集画面
 * @returns ユーザー情報を編集するためのページ
 */
const Edit: NextPage<Props> = (props) => {
  //初期表示用データ
  const { initialData } = props;
  //ユーザ情報編集用hook
  const { handleSubmit, cancel, register, errors, onSubmit, userData } =
    useUserEdit(initialData.user);
  //モーダルを使用するhook
  const modalStore = useModal();
  const { modalStatus, openModal, closeModal } = modalStore;

  return (
    <>
      <PasswordModal modalStatus={modalStatus} closeModal={closeModal} />
      <SubHeader title="ユーザー情報編集" />
      <div className="text-center my-10">
        {userData ? (
          <Image
            src={`/image/userIcon/${userData.userPhotoPath}`}
            width={200}
            height={200}
            alt="icon"
          ></Image>
        ) : (
          <div className="flex justify-center pt-10 w-full">
            <div className="animate-spin h-8 bg-basic rounded-xl"></div>
          </div>
        )}
        <div
          onClick={openModal}
          className="text-text-brown my-5 cursor-pointer hover:text-basic"
        >
          パスワード変更はこちら
        </div>
      </div>
      <div className="mx-10">
        <div className="text-red-500">{errors.firstName?.message}</div>
        <div className="text-red-500">{errors.lastName?.message}</div>
        <div className="flex gap-5 justify-center">
          {/* 姓のテキストフォーム */}
          <div>
            <TextInput
              label="姓"
              type="text"
              fullWidth={true}
              required
              placeholder="姓"
              registers={register("firstName")}
            />
          </div>

          {/* 名のテキストフォーム */}
          <div>
            <TextInput
              label="名"
              type="text"
              fullWidth={true}
              required
              placeholder="名"
              registers={register("lastName")}
            />
          </div>
        </div>

        {/* アカウント名のテキストフォーム */}
        <div className="mt-10">
          <div className="text-red-500">{errors.accountName?.message}</div>
          <TextInput
            label="アカウント名"
            type="text"
            fullWidth={true}
            required
            placeholder="アカウント名"
            registers={register("accountName")}
          />
        </div>
        {/* 入社月のテキストフォーム*/}
        <div className="mt-10">
          <div className="text-red-500">{errors.hireDate?.message}</div>
          <TextInput
            label="入社月"
            type="month"
            fullWidth={true}
            required
            registers={register("hireDate")}
          />
        </div>
        {/* 職種のラジオボタン */}
        <div className="text-center">
          <div className="mt-10">職種を選択してください</div>
          <div className="text-red-500">{errors.serviceFk?.message}</div>
          <div className="flex gap-3 lg:gap-5 mt-5 justify-center">
            <Radio
              id="FR"
              value="1"
              name="serviceFk"
              registers={register("serviceFk")}
            />
            <Radio
              id="Java"
              value="2"
              name="serviceFk"
              registers={register("serviceFk")}
            />
            <Radio
              id="CL"
              value="3"
              name="serviceFk"
              registers={register("serviceFk")}
            />
            <Radio
              id="QA"
              value="4"
              name="serviceFk"
              registers={register("serviceFk")}
            />
            <Radio
              id="ML"
              value="5"
              name="serviceFk"
              registers={register("serviceFk")}
            />
            <Radio
              id="内勤"
              value="6"
              name="serviceFk"
              registers={register("serviceFk")}
            />
          </div>
        </div>
        {/* 誕生日のテキストフォーム */}
        <div className="mt-10">
          <div className="text-red-500">{errors.birthDay?.message}</div>
          <TextInput
            label="誕生日"
            type="date"
            fullWidth={true}
            required
            registers={register("birthDay")}
          />
        </div>
        {/* 自己紹介のテキストフォーム */}
        <div className="mt-10">
          <TextArea
            label="プロフィール"
            rows={6}
            cols={30}
            registers={register("introduction")}
          />
          <div className="text-red-500">{errors.introduction?.message}</div>
        </div>
      </div>
      <div className="flex gap-5 my-10 justify-center">
        <Button
          label="更新"
          backgroundColor="#f28728"
          color="white"
          size="md"
          onClick={handleSubmit(onSubmit)}
        />

        <Button
          label="キャンセル"
          backgroundColor="#f6f0ea"
          color="#f28728"
          size="md"
          onClick={cancel}
        />
      </div>
    </>
  );
};

/**
 * SSRで初期データ取得.
 * @returns ユーザ情報初期表示用データ
 */
export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext,
) => {
  const cookies = new Cookies(ctx.req.headers.cookie);
  const hash = cookies.get("hash");
  const res = await fetch(`${JAVA_API_URL}/user/${hash}`);
  const initialData: UserInfo = await res.json();

  return {
    props: { initialData },
  };
};

export default Edit;
