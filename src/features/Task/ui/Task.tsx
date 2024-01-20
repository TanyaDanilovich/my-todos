import { TaskPropertiesSelect } from "common/components/TaskPropertiesSelect/TaskPropertiesSelect.tsx";
import { TaskPriorities, TaskStatuses, TaskType } from "features/Task/model/task.types.ts";
import "style.css";
import { TaskDatePicker } from "common/components/TaskDatePicker/TaskDatePicker.tsx";


type TaskPropsType = TaskType;

export const Task = ({ title, priority, status }: TaskPropsType) => {
  return (
    <tr className = "bg-white border-b transition duration-300 ease-in-out">
      <td className = "px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{title}</td>
      <td className = "text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap">
        <TaskDatePicker />
      </td>
      <td className = "text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap">
        {" "}
        <TaskPropertiesSelect options = {TaskPriorities} value = {priority} id = {"task-priority-select"} />
      </td>
      <td className = "text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap">
        {" "}
        <TaskPropertiesSelect id = {"task-status-select"} value = {status} options = {TaskStatuses} />
      </td>
    </tr>
  );
};
