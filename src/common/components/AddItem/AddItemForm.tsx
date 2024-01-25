import { PropsWithChildren } from "common/types/common.types.ts";
import { ChangeEvent, useState } from "react";

type Props = PropsWithChildren<
  {
    value?: string
    addItem: (title: string) => void
  }
>
export const AddItem = ({ value = "888888888", children, addItem }: Props) => {
  const [val, setVal] = useState(value);
  const changeInput = (event: ChangeEvent<HTMLInputElement>) => setVal(event.currentTarget.value);
  const addItemHandler = () => {
    addItem(val);
  };

  return <div className = "p-6 bg-white border border-gray-200 rounded-lg shadow flex justify-center align-middle">

    <input type = "text" value = {val} onChange = {changeInput}
           className = "flex-grow block  px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
    <button className = "flex items-center p-2 cursor-pointer" onClick = {addItemHandler}> {children}</button>
  </div>;
};