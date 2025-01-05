import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../store/taskSlice";
import { RootState } from "../store"; // Import RootState type

const InProgress: React.FC = () => {
  const [menuTaskId, setMenuTaskId] = useState<string | null>(null);

  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks); // Type the state using RootState

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  const handleMenuToggle = (taskId: string) => {
    setMenuTaskId(menuTaskId === taskId ? null : taskId);
  };

  return (
    <div className="w-full flex flex-col rounded-md bg-[#0000001A]">
      <div className="w-full bg-[#85D9F1] rounded-t-md text-[#000000] text-[16px] font-[600] leading-[22px] py-3 px-4">
        In Progress
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-col gap-4 p-4">
          <table className="w-full text-left">
            <tbody>
              {tasks.filter((task) => task.status === "in-progress").length >
              0 ? (
                tasks
                  .filter((task) => task.status === "in-progress")
                  .map((task) => (
                    <tr
                      key={task.id}
                      className="text-sm text-[#000000] font-[500]"
                    >
                      <td className="w-1/4 p-2">{task.title}</td>
                      <td className="w-1/4 p-2">
                        {task.dueDate ? task.dueDate : "No Due Date"}
                      </td>
                      <td className="w-1/4 p-2">
                        {task.status ? task.status : ""}
                      </td>
                      <td className="w-1/4 p-2">{task.category}</td>
                      <td className="w-[100px] p-2 relative">
                        {" "}
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
                              onClick={() => {
                                setMenuTaskId(null);
                              }}
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
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="p-2 text-center border border-gray-300 text-gray-500"
                  >
                    No tasks available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InProgress;
