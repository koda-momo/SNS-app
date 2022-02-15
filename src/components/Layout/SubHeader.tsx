import { FC, memo } from "react";

export type Props = {
  title: string;
};

/**
 * サブヘッダー用コンポーネント.
 * @remarks  <div className="w-10/12"></div>で囲むとメニューバーとのサイズ感が良い
 */
export const SubHeader: FC<Props> = memo((props) => {
  return (
    <>
      <div>
        <div className="bg-bgc h-20 text-center pt-7 font-black">
          {props.title}
        </div>
      </div>
    </>
  );
});
