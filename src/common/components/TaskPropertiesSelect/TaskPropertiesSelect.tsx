import { PrioritiesValue, StatusesValue } from "features/Task/model/task.types.ts";
import { useId, useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import "style.css";
import { TaskPriorities, TaskStatuses } from "common/constants";

type TaskPropertiesSelect = {
  id: string;
  value: PrioritiesValue | StatusesValue;
  onChange?: () => void;
  options: typeof TaskPriorities | typeof TaskStatuses;
  label?: string;
};

export const TaskPropertiesSelect = ({ options }: TaskPropertiesSelect) => {
  const mappedOptions = Object.entries(options).map(([key, value]) => ({ description: key, value }));

  const [selected, setSelected] = useState(mappedOptions[0]);
  const id = useId();

  return (
    <>
      <Listbox value = {selected} onChange = {setSelected}>
        <div className = "relative mt-1">
          <Listbox.Button
            className = "relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className = "block truncate">{selected.description}</span>
            <span className = "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className = "h-5 w-5 text-gray-400" aria-hidden = "true" />
            </span>
          </Listbox.Button>
          <Transition as = {Fragment} leave = "transition ease-in duration-100" leaveFrom = "opacity-100"
                      leaveTo = "opacity-0">
            <Listbox.Options
              className = "z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-md ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {mappedOptions.map((option) => (
                <Listbox.Option
                  key = {`${option.value}-${id}`}
                  className = {({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-blue-50 text-blue-900 font-medium" : "text-gray-900"
                    }`
                  }
                  value = {option}
                >
                  {({ selected }) => (
                    <>
                      <span className = {`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                        {option.description}
                      </span>
                      {selected ? (
                        <span className = "absolute inset-y-0 left-0 flex items-center pl-3 text-blue-900">
                          <CheckIcon className = "h-5 w-5" aria-hidden = "true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </>
  );
};
