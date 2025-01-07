/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editTask } from "../store/taskSlice";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  //@ts-ignore
  task: Task | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, task }) => {
  const dispatch = useDispatch();
  //@ts-ignore
  const [editedTask, setEditedTask] = useState<Task | null>(task);

  // Update local state whenever the task prop changes
  useEffect(() => {
    setEditedTask(task);
  }, [task]);

  if (!isOpen || !editedTask) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    //@ts-ignore
    setEditedTask((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleSave = () => {
    if (editedTask) {
      dispatch(editTask(editedTask));
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-[400px]">
        <h2 className="text-lg font-bold mb-4">Edit Task</h2>
        <div className="flex flex-col gap-2">
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={editedTask.title}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </label>
          <label>
            Category:
            <select
              name="category"
              value={editedTask.category}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
            </select>
          </label>
          <label>
            Status:
            <select
              name="status"
              value={editedTask.status}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="complete">Complete</option>
            </select>
          </label>
          <label>
            Due Date:
            <input
              type="date"
              name="dueDate"
              value={editedTask.dueDate || ""}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </label>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
