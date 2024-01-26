import { PropsWithChildren } from "common/types/common.types.ts";
import { ChangeEvent, useState } from "react";
import { SimpleInput } from "common/components/SimpleInput/SimpleInput.tsx";

type Props = PropsWithChildren<
  {
    addItem: (title: string) => void
    autofocus?:boolean
  }
>
export const AddItem = ({ children, addItem,autofocus }: Props) => {
  const [title, setTitle] = useState("");
  const changeInput = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value);
  const addItemHandler = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle !== "") {
      addItem(trimmedTitle);
      setTitle("");
    }
  };
  const enterKeyDown = () => {
    addItemHandler();
  };

  return <div className = "p-6 bg-white border border-gray-200 rounded-lg shadow flex justify-center align-middle">

    <SimpleInput value = {title} onChange = {changeInput} onEnterKeyDown = {enterKeyDown} autoFocus={autofocus}/>
    <button onClick = {addItemHandler}
            className = "flex items-center p-2 cursor-pointer">
      {children}
    </button>
  </div>;
};