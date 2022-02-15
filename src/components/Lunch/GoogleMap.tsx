import { memo, FC, useState } from "react";

export type Props = {
  latitude: string; //緯度
  longitude: string; //経度
};

/**
 * Googleマップコンポーネント.
 * @remarks 緯度と経度をstring型で渡してあげてください
 */
export const GoogleMap: FC<Props> = memo((props) => {
  const {
    latitude, //緯度
    longitude, //経度
  } = props;

  const [url] = useState(
    `http://maps.google.co.jp/maps?q=${latitude},${longitude}&output=embed&t=m&z=16&hl=ja`,
  );

  return (
    <div>
      <iframe src={url} loading="lazy" className="w-full h-48 sm:h-96"></iframe>
    </div>
  );
});
