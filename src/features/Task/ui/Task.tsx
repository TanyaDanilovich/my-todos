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
import { TaskPrioritiesValues, TaskStatusesValues } from "common/types/common.types.ts";


type TaskPropsType = TaskType & {
  deleteTask: (arg: DeleteTaskArg) => void
};

export const Task = ({ id, title, priority, status, todoListId, deleteTask, deadline }: TaskPropsType) => {
  const dispatch = useAppDispatch();
  const updateTask = (arg: UpdateTask) => dispatch(tasksActions.updateTask(arg));
  const onDeleteTask = () => deleteTask({ todoListId: todoListId, taskId: id });

  const updateTitle = (title: string) => updateTask({ id, todoListId, title });
  const updatePriority = (priority: TaskPrioritiesValues) => updateTask({ id, todoListId, priority });
  const updateStatus = (status: TaskStatusesValues) => updateTask({ id, todoListId, status });
  const updateDeadlineDate = (deadline: string) => updateTask({ id, todoListId, deadline });



  return (
    <tr className = "bg-white border-b transition duration-300 ease-in-out">
      <td className = "px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
        <EditableSpan value = {title} onChange = {updateTitle} />
      </td>
      <td className = "text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap">
        <TaskDatePicker value = {deadline} onChange = {updateDeadlineDate} id = {`${id}-deadline-date`} />
      </td>
      <td className = "text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap">
        {" "}
        <TaskPropertiesSelect onChange = {updatePriority} options = {TaskPriorities} value = {priority}
                              id = {`${id}-priority`} />
      </td>
      <td className = "text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap">
        {" "}
        <TaskPropertiesSelect onChange = {updateStatus} id = {`${id}-status`} value = {status}
                              options = {TaskStatuses} />
      </td>
      <td>
        <button onClick = {onDeleteTask}>
          <TrashIcon />
        </button>

      </td>
    </tr>
  );
};
