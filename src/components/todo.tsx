import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask } from "../store/taskSlice";
import { RootState } from "../store"; // Import RootState type
import { nanoid } from "nanoid";

const Todo: React.FC = () => {
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("default");
  const [category, setCategory] = useState("default");
  const [menuTaskId, setMenuTaskId] = useState<string | null>(null);

  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks); // Type the state using RootState

  const handleAddTask = () => {
    if (!taskName || status === "default" || category === "default") {
      alert("Please fill in all fields!");
      return;
    }

    const newTask = {
      id: nanoid(), // Generate unique ID for the task
      title: taskName,
      dueDate,
      category,
      isCompleted: status === "complete",
    };

    dispatch(addTask(newTask));

    // Reset form fields after adding the task
    setTaskName("");
    setDueDate("");
    setStatus("default");
    setCategory("default");
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  const handleMenuToggle = (taskId: string) => {
    setMenuTaskId(menuTaskId === taskId ? null : taskId);
  };

  return (
    <div className="w-full flex flex-col rounded-md bg-[#0000001A]">
      <div className="w-full bg-[#FAC3FF] rounded-t-md text-[#000000] text-[16px] font-[600] leading-[22px] p-3">
        Todo
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-2">
            <label className="font-medium">Task Name:</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter task name"
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium">Due Date:</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col">
              <label className="font-medium mb-2">Set Status:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="default" disabled>
                  Select Status
                </option>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="complete">Complete</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-2">Set Category:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="default" disabled>
                  Select Category
                </option>
                <option value="personal">Personal</option>
                <option value="office">Office</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleAddTask}
            className="mt-4 p-2 bg-blue-500 text-white rounded-md"
          >
            Add Task
          </button>
        </div>

        <div className="w-full flex flex-col gap-4">
          <table className="w-full text-left">
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <tr key={task.id}>
                    <td className="p-2">{task.title}</td>
                    <td className="p-2">
                      {task.dueDate ? task.dueDate : "No Due Date"}
                    </td>
                    <td className="p-2">
                      {task.isCompleted
                        ? "Complete"
                        : task.status === "in-progress"
                        ? "In Progress"
                        : "To Do"}
                    </td>
                    <td className="p-2">{task.category}</td>
                    <td className="p-2 relative">
                      {" "}
                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => handleMenuToggle(task.id)}
                      >
                        ...
                      </button>
                      {menuTaskId === task.id && (
                        <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-300 rounded-md shadow-md">
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

export default Todo;
