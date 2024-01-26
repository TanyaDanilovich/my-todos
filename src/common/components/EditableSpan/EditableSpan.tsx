import { ChangeEvent, useState } from "react";
import { Mode } from "common/types/common.types.ts";
import { SimpleInput } from "common/components/SimpleInput/SimpleInput.tsx";

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
    setTitle(title.trim());
    if (title !== "") onChange(title);
  };

  const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const onEnterKeyDown = () => activatedViewMode();


  return mode === "edit" ?

    <SimpleInput value = {title}
                 onChange = {changeTitle}
                 onEnterKeyDown = {onEnterKeyDown}
                 onBlur = {activatedViewMode}
                 autoFocus = {true} />


    : <p onDoubleClick = {activatedEditMode}>{value}</p>;

};