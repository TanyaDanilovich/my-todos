import { FC, useEffect } from "react";
import { useAppDispatch } from "../../../../common/hooks/reduxHook.ts";
import { setTasksTC } from "features/Task/model/tasksSlice.ts";
import { Task } from "../../../Task/ui/Task.tsx";
import { useAppSelector } from "../../../../app/store.ts";
import { TodoListType } from "../../api/todoList.types.ts";
import "../../../../style.css";

type TodoListPropsType = TodoListType;

export const TodoList: FC<TodoListPropsType> = ({ id, title }) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks[id]);

  useEffect(() => {
    dispatch(setTasksTC(id));
  }, []);

  const renderedTasks = tasks.map((task) => {
    return (
      <Task
        key={task.id}
        description={task.description}
        title={task.title}
        status={task.status}
        priority={task.priority}
        startDate={task.startDate}
        deadline={task.deadline}
        id={task.id}
        todoListId={task.todoListId}
        order={task.order}
        addedDate={task.addedDate}
      />
    );
  });

  return (
    <>
      <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 flex justify-center"> {title}</h5>

        <div className="flex flex-col">
          <div className=" sm:mx-0.5 lg:mx-0.5">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="">
                <table className="min-w-full">
                  <thead className="bg-gray-200 border-b">
                    <tr>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Title
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        deadline
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        priority
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        status
                      </th>
                    </tr>
                  </thead>

                  <tbody>{renderedTasks}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};