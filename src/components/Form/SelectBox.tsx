import { Dispatch, FC, Fragment, memo, SetStateAction } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";

import type { Option } from "../../types/type";

type Props = {
  label?: string;
  selectedOption: Option;
  select: Dispatch<SetStateAction<Option>>;
  options: Array<{ id: string; name: string }>; // 選択肢
  fullWidth?: boolean;
};

export const SelectBox: FC<Props> = memo((props) => {
  const { label, selectedOption, select, options, fullWidth = false } = props;

  return (
    <div className={`${fullWidth ? "w-full" : "w-44 sm:w-56 lg:w-64"}`}>
      {/* labelが渡ってきたら、ラベルを表示 */}
      <div className="text-left">
        {label && <label className="text-gray-500 text-sm">{label}</label>}
      </div>
      <Listbox value={selectedOption} onChange={select}>
        <div className="relative">
          <Listbox.Button
            className={
              "w-full relative h-8 sm:h-10 lg:h-11 py-1 pl-3 pr-10 text-left bg-white border border-gray-200 rounded-lg shadow-md focus:outline-none text-xs sm:text-sm"
            }
          >
            <span className="block truncate">{selectedOption.name}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 z-20 text-left bg-white rounded-md shadow-lg max-h-60 focus:outline-none sm:text-sm text-xs lg:text-lg overflow-y-auto">
              {options.map((option) => (
                <Listbox.Option
                  key={option.id}
                  className={({ active }) =>
                    `${active ? "text-text-brown bg-bgc" : "text-gray-900"}
                           select-none relative py-2 pl-4 pr-4`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`${
                          selected ? "font-bold" : "font-normal"
                        } block truncate`}
                      >
                        {option.name}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
});
