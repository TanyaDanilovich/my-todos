import { PlusIcon } from "common/components/icons/PlusIcon.tsx";
import { AddItem } from "common/components/AddItem/AddItemForm.tsx";
import { useState } from "react";

type Props = {
  addTask: (title: string) => void
}


export const AddTask = ({ addTask }: Props) => {
  const [isAddMode, setAddMode] = useState<boolean>(false);

  const onAddMode = () => setAddMode(true);
  const ofAddMode = (title:string) => {
    setAddMode(false);
   addTask(title);

  };


  return isAddMode
    ? <AddItem addItem = {ofAddMode}><PlusIcon /></AddItem>
    : <div>
      <button onClick = {onAddMode}><PlusIcon /></button>
    </div>;
};

