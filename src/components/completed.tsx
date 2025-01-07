/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, rearrangeTasks } from "../store/taskSlice";
import { RootState } from "../store"; // Import RootState type
import { Reorder } from "framer-motion";
import Modal from "./modal";

const Complete: React.FC = () => {
  const [menuTaskId, setMenuTaskId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //@ts-ignore
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks); // Type the state using RootState

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  const handleMenuToggle = (taskId: string) => {
    setMenuTaskId(menuTaskId === taskId ? null : taskId);
  };

  //@ts-ignore
  const handleReorder = (reorderedInProgressTasks: Task[]) => {
    const allTasks = tasks;

    const otherTasks = allTasks.filter((task) => task.status !== "complete");

    const updatedTasks = [...otherTasks, ...reorderedInProgressTasks];

    dispatch(rearrangeTasks({ reorderedTasks: updatedTasks }));
  };

  //@ts-ignore
  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
    setMenuTaskId(null);
  };

  return (
    <>
      <div className="w-full flex flex-col rounded-md bg-[#0000001A]">
        <div className="w-full bg-[#CEFFCC] rounded-t-md text-[#000000] text-[16px] font-[600] leading-[22px] py-3 px-4">
          COMPLETED
        </div>
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-col gap-1 p-4">
            {tasks.filter((task) => task.status === "complete").length > 0 ? (
              <Reorder.Group
                as="div"
                values={tasks.filter((task) => task.status === "complete")}
                onReorder={handleReorder}
                className="w-full flex flex-col gap-1"
              >
                {tasks
                  .filter((task) => task.status === "complete")
                  .map((task) => (
                    <Reorder.Item
                      key={task.id}
                      value={task}
                      className="w-full flex text-sm text-[#000000] font-[500] items-center hover:shadow-2xl border border-transparent hover:border-gray-500 rounded-md"
                    >
                      <div className="p-2 w-1/4">{task.title}</div>
                      <div className="p-2 w-1/4">
                        {task.dueDate ? task.dueDate : "No Due Date"}
                      </div>
                      <div className="p-2 w-1/4">{task.status}</div>
                      <div className="p-2 w-1/4">{task.category}</div>
                      <div className="p-2 relative w-[100px]">
                        <button
                          className="text-gray-500 hover:text-gray-700 text-2xl font-bold flex items-center justify-center"
                          onClick={() => handleMenuToggle(task.id)}
                        >
                          ...
                        </button>
                        {menuTaskId === task.id && (
                          <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-300 rounded-md shadow-md z-50">
                            <button
                              className="block w-full text-left p-2 hover:bg-gray-100"
                              onClick={() => handleEditTask(task)}
                            >
                              Edit
                            </button>
                            <button
                              className="block w-full text-left p-2 text-red-600 hover:bg-gray-100"
                              onClick={() => {
                                handleDeleteTask(task.id);
                                setMenuTaskId(null);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </Reorder.Item>
                  ))}
              </Reorder.Group>
            ) : (
              <div className="w-full p-2 text-center text-sm text-[#000000] font-[500]">
                No tasks available
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={taskToEdit}
      />
    </>
  );
};

export default Complete;
