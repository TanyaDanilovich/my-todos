import { useState } from "react";

type Props = {
  value?: string

}
export const EditableSpan = ({ value = "" }: Props) => {
  const [isEditMode, setEditMode] = useState(false);

  return isEditMode ?


    <input id = "username" type = "text" onBlur = {() => {
      setEditMode(false);
    }}
           className = "block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" />

    : <p onDoubleClick = {() => {
      setEditMode(true);
    }}>{value}</p>;

};