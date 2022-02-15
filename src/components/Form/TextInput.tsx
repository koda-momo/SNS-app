import { ChangeEventHandler, FC, memo } from "react";

type Props = {
  label?: string;
  value?: string;
  type: string;
  fullWidth: boolean; // trueなら親要素のwidthの長さ
  placeholder?: string;
  maxLength?: number;
  required: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyUp?: ChangeEventHandler<HTMLInputElement>;
  errorMessage?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registers?: any;
};

/**
 * 汎用的なテキスト入力コンポーネント.
 */
export const TextInput: FC<Props> = memo((props) => {
  const {
    label,
    value,
    type,
    fullWidth = true,
    placeholder,
    maxLength,
    required,
    onChange,
    errorMessage,
    registers,
    onKeyUp,
  } = props;

  return (
    <div>
      <div className="flex items-center mb-1">
        <div className="flex-col text-left">
          <div className="ml-3 text-xs text-red-600">{errorMessage}</div>
          <div>
            <label htmlFor={label}>{label}</label>
            {/* requiredがtrueの場合は必須のバッジ表示 */}
            {required && (
              <span className="bg-basic text-white text-xs font-medium ml-3 px-2 py-1.5 rounded-lg dark:bg-red-200 dark:text-red-900">
                必須
              </span>
            )}
          </div>
        </div>
      </div>
      <input
        id={label}
        value={value}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        required
        className={`${
          fullWidth && "w-full"
        } relative py-2 pl-3 pr-10 text-left bg-white border border-gray-300 shadow-md outline-none rounded-lg focus:outline-none focus:border-basic focus-visible:ring-white text-xs sm:text-sm lg:text-lg`}
        onChange={onChange}
        onKeyUp={onKeyUp}
        {...registers}
      />
    </div>
  );
});
