import "style.css";
import { useState } from "react";
import {
  TaskPrioritiesKeys,
  TaskPrioritiesValues,
  TaskStatusesKeys,
  TaskStatusesValues
} from "common/types/common.types.ts";
import { TaskPriorities, TaskStatuses } from "common/constants";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/16/solid";


type TaskPropertiesSelect = {
  id: string;
  value: TaskStatusesValues | TaskPrioritiesValues
  onChange: (value: TaskStatusesValues | TaskPrioritiesValues) => void;
  options: typeof TaskPriorities | typeof TaskStatuses
  label?: string;
};


export const TaskPropertiesSelect = ({ options, value, id, onChange }: TaskPropertiesSelect) => {
  const mappedOptions = Object.entries(options).map(([key, value]) => ({ title: key, value }));

  const selectedIndex = mappedOptions.findIndex(option => option.value === value);

  const [isShowOptions, setShowOptions] = useState<boolean>(false);
  // const [isActive, setActive] = useState<boolean>(false);
  const [selected, setSelected] = useState(mappedOptions[selectedIndex || 0]);
  //const id = useId();
  const toggleOptions = () => setShowOptions(prev => !prev);
  const changeSelected = (option: {
    value: TaskStatusesValues | TaskPrioritiesValues,
    title: TaskPrioritiesKeys | TaskStatusesKeys
  }) => {
    setSelected(option);
    toggleOptions();
    onChange(option.value);
  };

  return (<div className = "relative mt-1">
    <div onClick = {toggleOptions}
         className = "relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
      <span className = "block truncate">{selected.title}</span>
      <span className = "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className = "h-5 w-5 text-gray-400" aria-hidden = "true" />
            </span>
    </div>
    {isShowOptions && <div
      className = "z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-md ring-1 ring-black/5 focus:outline-none sm:text-sm">
      {mappedOptions.map((option, index) => {
        const isActive = option.value === value;
        const clickHandler = () => {
          changeSelected(option);
        };
        isActive && console.log(option.value);
        return <div key = {`${id}-${index}`} onClick = {clickHandler}
                    className = {"flex hover:bg-blue-50 border-2 flex-row-reverse"}>{option.title}
          {isActive ? (
            <span className = " inset-y-0 left-0 flex items-center pl-3 text-blue-900">
                          <CheckIcon className = "h-auto w-5" aria-hidden = "true" />
                        </span>
          ) : null}
        </div>;
      })}
    </div>}

  </div>);
};
//   return (
//     <>
//       <Listbox value = {selected} onChange = {setSelected}>
//         <div className = "relative mt-1">
//
//           <Transition as = {Fragment} leave = "transition ease-in duration-100" leaveFrom = "opacity-100"
//                       leaveTo = "opacity-0">
//             <Listbox.Options
//               className = "z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-md ring-1 ring-black/5 focus:outline-none sm:text-sm">
//               {mappedOptions.map((option) => (
//                 <Listbox.Option
//                   key = {`${option.value}-${id}`}
//                   className = {({ active }) =>
//                     `relative cursor-default select-none py-2 pl-10 pr-4 ${
//                       active ? "bg-blue-50 text-blue-900 font-medium" : "text-gray-900"
//                     }`
//                   }
//                   value = {option}
//                 >
//                   {({ selected }) => (
//                     <>
//                       <span className = {`block truncate ${selected ? "font-medium" : "font-normal"}`}>
//                         {option.description}
//                       </span>
//                       {selected ? (
//                         <span className = "absolute inset-y-0 left-0 flex items-center pl-3 text-blue-900">
//                           <CheckIcon className = "h-5 w-5" aria-hidden = "true" />
//                         </span>
//                       ) : null}
//                     </>
//                   )}
//                 </Listbox.Option>
//               ))}
//             </Listbox.Options>
//           </Transition>
//         </div>
//       </Listbox>
//     </>
//   );
// };
