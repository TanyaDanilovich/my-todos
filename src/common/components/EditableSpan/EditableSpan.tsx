import { ChangeEvent, useState } from "react";
import { Mode } from "common/types/common.types.ts";

type Props = {
  value: string
  onChange: (newValue: string) => void
}
export const EditableSpan = ({ value = "", onChange }: Props) => {
  const [mode, setMode] = useState<Mode>("view");
  const [title, setTitle] = useState<string>(value);
  const activatedEditMode = () => setMode("edit");
  const activatedViewMode = () => {
    setMode("view");
    onChange(title);
  };

  const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  return mode === "edit" ?


    <input type = "text"
           value = {title}
           onChange = {changeTitle}
           autoFocus
           onBlur = {activatedViewMode}
           className = "block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" />

    : <p onDoubleClick = {activatedEditMode}>{value}</p>;

};