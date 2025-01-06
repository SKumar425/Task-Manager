/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

interface IDraggableProps {
  id: string | number;
  task: {
    id: string;
    title: string;
    dueDate: string | null;
    status: string;
    category: string;
  };
  deleteTask: (taskId: string) => void;
  toggleMenu: (taskId: string) => void;
  isMenuOpen: boolean;
}

const DraggableTask: React.FC<IDraggableProps> = ({
  
  task,
  deleteTask,
  toggleMenu,
  isMenuOpen,
}) => {
  return (
    <div
      className="w-full flex text-sm text-[#000000] font-[500] items-center hover:shadow-2xl border border-transparent hover:border-gray-500 rounded-md"
    >
      <div className="p-2 w-1/4">{task.title}</div>
      <div className="p-2 w-1/4">{task.dueDate || "No Due Date"}</div>
      <div className="p-2 w-1/4">{task.status}</div>
      <div className="p-2 w-1/4">{task.category}</div>
      <div className="p-2 relative w-[100px]">
        <button
          className="text-gray-500 hover:text-gray-700 text-2xl font-bold flex items-center justify-center"
          onClick={() => toggleMenu(task.id)}
        >
          ...
        </button>
        {isMenuOpen && (
          <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-300 rounded-md shadow-md z-50">
            <button
              className="block w-full text-left p-2 hover:bg-gray-100"
              onClick={() => toggleMenu("")}
            >
              Edit
            </button>
            <button
              className="block w-full text-left p-2 text-red-600 hover:bg-gray-100"
              onClick={() => {
                deleteTask(task.id);
                toggleMenu("");
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DraggableTask;
