import { TaskPropertiesSelect } from "common/components/TaskPropertiesSelect/TaskPropertiesSelect.tsx";
import { TaskType, UpdateTask } from "features/Task/model/task.types.ts";
import "style.css";
import { TaskDatePicker } from "common/components/TaskDatePicker/TaskDatePicker.tsx";
import { TrashIcon } from "common/components/icons/TrashIcon.tsx";
import { TaskPriorities, TaskStatuses } from "common/constants";
import { DeleteTaskArg } from "features/Task/api/tasks/tasksAPI.ts";
import { useAppDispatch } from "common/hooks/reduxHook.ts";
import { tasksActions } from "features/Task/model/tasksSlice.ts";
import { EditableSpan } from "common/components/EditableSpan/EditableSpan.tsx";


type TaskPropsType = TaskType & {
  deleteTask: (arg: DeleteTaskArg) => void
};

export const Task = ({ id, title, priority, status, todoListId, deleteTask }: TaskPropsType) => {
  const dispatch = useAppDispatch();
  const updateTask = (arg: UpdateTask) => dispatch(tasksActions.updateTask(arg));
  const onDeleteTask = () => deleteTask({ todoListId: todoListId, taskId: id });

  const updateTitle = (newTitle: string) => updateTask({ id, todoListId, title: newTitle });

  return (
    <tr className = "bg-white border-b transition duration-300 ease-in-out">
      <td className = "px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
        <EditableSpan value = {title} onChange = {updateTitle} />
      </td>
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
      <td>
        <button onClick = {onDeleteTask}>
          <TrashIcon />
        </button>

      </td>
    </tr>
  );
};
