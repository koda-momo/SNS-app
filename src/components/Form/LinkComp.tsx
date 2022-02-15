import { FC } from "react";
import Link from "next/link";

export type Props = {
  linkText: string;
  url: string;
  firstText?: string;
  lastText?: string;
};

export const LinkComp: FC<Props> = (props) => {
  const { linkText, url, firstText, lastText } = props;
  return (
    <>
      <div>
        {firstText}
        <Link href={url}>
          <a className="underline block mt-3 hover:text-blue-800 ">
            {linkText}
          </a>
        </Link>
        {lastText}
      </div>
    </>
  );
};
