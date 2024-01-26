import { PlusIcon } from "common/components/icons/PlusIcon.tsx";
import { AddItem } from "common/components/AddItem/AddItemForm.tsx";
import { useState } from "react";

type Props = {
  addTask: (title: string) => void
}


export const AddTask = ({ addTask }: Props) => {
  const [isAddMode, setAddMode] = useState<boolean>(false);

  const activateAddMode = () => setAddMode(true);
  const deactivateAddMode = (title: string) => {
    setAddMode(false);
    addTask(title);
  };


  return isAddMode
    ? <AddItem addItem = {deactivateAddMode} autofocus = {true}><PlusIcon /></AddItem>
    : <div>
      <button onClick = {activateAddMode}><PlusIcon /></button>
    </div>;
};

