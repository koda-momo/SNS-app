import { FC } from "react";

export type Props = {
  id: string;
  value: string;
  name: string;
  defaultChecked?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registers?: any;
};

export const Radio: FC<Props> = (props) => {
  const { value, id, name, defaultChecked, registers } = props;
  return (
    <div>
      <div className="flex-col text-left">
        <input
          type="radio"
          name={name}
          value={value}
          id={id}
          defaultChecked={defaultChecked}
          {...registers}
        />
        <label htmlFor={id}>{id}</label>
      </div>
    </div>
  );
};
