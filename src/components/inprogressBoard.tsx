/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, rearrangeTasks } from "../store/taskSlice";
import { RootState } from "../store"; // Import RootState type
import { Reorder } from "framer-motion";
import Modal from "./modal";

const InProgressBoard: React.FC = () => {
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

    const otherTasks = allTasks.filter((task) => task.status !== "in-progress");

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
      <div className="w-1/3 flex flex-col gap-4 rounded-xl bg-[#58575112] p-[12px] h-max">
        <div className="w-max bg-[#85D9F1] rounded-md text-[#000000] text-[14px] font-[600] leading-[22px] p-2">
          IN-PROGRESS
        </div>
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-col gap-2">
            {tasks.filter((task) => task.status === "in-progress").length >
            0 ? (
              <Reorder.Group
                as="div"
                values={tasks.filter((task) => task.status === "in-progress")}
                onReorder={handleReorder}
                className="w-full flex flex-col gap-1"
              >
                {tasks
                  .filter((task) => task.status === "in-progress")
                  .map((task) => (
                    <Reorder.Item
                      key={task.id}
                      value={task}
                      className="w-full flex text-base text-[#000000] font-[700] items-center hover:shadow-2xl border border-gray-500 rounded-md bg-[#FFFFFF] p-4"
                    >
                      <div className="w-full">{task.title}</div>

                      <div className="relative ">
                        <button
                          className="text-gray-500 hover:text-gray-700 text-2xl font-bold pb-2"
                          onClick={() => handleMenuToggle(task.id)}
                        >
                          ...
                        </button>
                        {menuTaskId === task.id && (
                          <div className="absolute right-5 top-0 mt-1 w-32 bg-white border border-gray-300 rounded-md shadow-md z-50">
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

export default InProgressBoard;
