import { useId } from "react";
import "../../../style.css";

type TaskDatePicker = {
  // id: string;
  // value: PrioritiesValue | StatusesValue;
  // onChange?: () => void;
  // options: typeof PRIORITIES | typeof TASK_STATUSES;
  // label?: string;
};

export const TaskDatePicker = ({}: TaskDatePicker) => {
  const id = useId();

  return <input type={"date"} id={id} />;
};
