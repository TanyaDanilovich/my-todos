import { ChangeEvent, useRef, useState } from "react";
import "../../../style.css";

type TaskDatePicker = {
  id: string;
  value: string | null;
  onChange: (deadline: string) => void;
};
const serializedDateForInput = (date: string | null) => {
  let res = "";
  if (date) {
    const serializedDate = new Date(date);
    res = serializedDate.toJSON().slice(0, 10);
  }
  return res;
};

const serializedDateForServer = (date: string) => {
  const deadlineDate = new Date(date);
  return new Date(Date.UTC(deadlineDate.getFullYear(), deadlineDate.getMonth(), deadlineDate.getDate(), 23, 59, 59)).toISOString();

};

export const TaskDatePicker = ({ id, value, onChange }: TaskDatePicker) => {
  const [date, setDate] = useState<string>(value || "");
  const inputRef = useRef<HTMLInputElement>(null);
  const changeDate = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.currentTarget.value);
    onChange(serializedDateForServer(event.currentTarget.value));
    inputRef.current && inputRef.current.blur();
  };


  return <input type = {"date"} id = {id} ref = {inputRef} onChange = {changeDate}
                value = {serializedDateForInput(date)} />;
};
