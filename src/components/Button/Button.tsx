import { MouseEventHandler, memo, FC } from "react";

type Props = {
  label: string;
  backgroundColor?: string;
  color?: string;
  size?: "xs" | "sm" | "md" | "lg";
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

/**
 * 汎用的なボタンコンポーネント.
 */
export const Button: FC<Props> = memo((props) => {
  const {
    label,
    backgroundColor = "#f28728",
    color = "#fff",
    size,
    onClick,
    disabled = false,
  } = props;

  let scale = 1;
  if (size === "xs") scale = 0.3;
  if (size === "sm") scale = 0.75;
  if (size === "lg") scale = 1.5;

  const style = {
    backgroundColor,
    color,
    padding: `${scale * 0.3}rem ${scale * 1}rem`,
    width: `${scale * 10}rem`,
  };

  return (
    <button
      onClick={onClick}
      style={style}
      className={`rounded-md shadow-md border-none font-bold hover:opacity-90 ${
        disabled && "cursor-default"
      }`}
      disabled={disabled}
    >
      {label}
    </button>
  );
});
