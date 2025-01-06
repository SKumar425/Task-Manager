/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, rearrangeTasks } from "../store/taskSlice";
import { RootState } from "../store"; // Import RootState type
import { nanoid } from "nanoid";
import { Reorder } from "framer-motion";

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
      id: nanoid(),
      title: taskName,
      dueDate,
      category,
      status,
    };

    //@ts-ignore
    dispatch(addTask(newTask));

    // Reset form fields after adding the task
    setTaskName("");
    setDueDate("");
    setStatus("default");
    setCategory("default");
  };

  const handleCancel = () => {
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

  //@ts-ignore
  const handleReorder = (reorderedInProgressTasks: Task[]) => {
    const allTasks = tasks;

    
    const otherTasks = allTasks.filter((task) => task.status !== "todo");

    const updatedTasks = [...otherTasks, ...reorderedInProgressTasks];

    dispatch(rearrangeTasks({ reorderedTasks: updatedTasks }));
  };

  return (
    <div className="w-full flex flex-col rounded-md bg-[#0000001A]">
      <div className="w-full bg-[#FAC3FF] rounded-t-md text-[#000000] text-[16px] font-[600] leading-[22px] py-3 px-4">
        TODO
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
                <option value="work">Work</option>
              </select>
            </div>
          </div>

          <div className="w-full flex gap-5">
            <button
              onClick={handleAddTask}
              className="w-full p-2 bg-[#7B1984] text-white rounded-full"
            >
              ADD TASK
            </button>
            <button
              onClick={handleCancel}
              className="w-full p-2 bg-blue-500 text-white rounded-full"
            >
              CANCEL
            </button>
          </div>
        </div>

        <div className="w-full flex flex-col gap-1 p-4">
          {tasks.filter((task) => task.status === "todo").length > 0 ? (
            <Reorder.Group
              as="div"
              values={tasks.filter((task) => task.status === "todo")}
              onReorder={handleReorder}
              className="w-full flex flex-col gap-1"
            >
              {tasks
                .filter((task) => task.status === "todo")
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
  );
};

export default Todo;
