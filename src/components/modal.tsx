/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useEffect, useRef } from "react";
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
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const uploadedFiles = Array.from(e.target.files).map((file) => file.name);
      //@ts-ignore
      setEditedTask((prev) =>
        prev ? { ...prev, files: uploadedFiles } : prev
      );
    }
  };

  const handleSave = () => {
    if (editedTask) {
      dispatch(editTask(editedTask));
      onClose();

      // Reset the file input field
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
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
          <label>
            Attach Files:
            <input
              type="file"
              multiple
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </label>
          {editedTask.files && (
            <div className="mt-2">
              <p className="font-medium">Uploaded Files:</p>
              <ul className="list-disc pl-5">
                {editedTask.files.map((file, index) => (
                  <li key={index}>{file}</li>
                ))}
              </ul>
            </div>
          )}
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
