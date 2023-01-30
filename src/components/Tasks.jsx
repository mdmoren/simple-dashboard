import React, { useState, useEffect } from "react";
import {
  MdAdd,
  MdDeleteForever,
  MdCheck,
  MdUndo,
  MdClear,
} from "react-icons/md";

const Tasks = () => {
  const [todos, setTodos] = useState(() => {
    const localData = localStorage.getItem("todos");
    return localData ? JSON.parse(localData) : [];
  });

  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleSubmit(event) {
    event.preventDefault();
    const newTodo = event.target.elements.todo.value;
    if (newTodo.trim() === "") {
      setIsValid(false);
      setTimeout(() => {
        setIsValid(true);
      }, 1000); // 1 seconds
      return;
    }
    setIsValid(true);
    setTodos([...todos, { text: newTodo, id: Date.now() }]);
    event.target.reset();
  }

  function handleCheck(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function handleDelete(id) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function handleClear() {
    localStorage.removeItem("todos");
    setTodos([]);
  }

  const timerId = setTimeout(() => {
    setIsValid(true);
  }, 5000);

  clearTimeout(timerId);

  return (
    <div
      className="
      flex relative w-full h-full justify-center items-stretch scrollbar-hide"
    >
      <div className="absolute w-full p-3 md:p-0">
        <div className="flex-grow-0 h-full flex flex-col items-stretch px-2 md:px-10 md:mt-5 mb-5">
          <div className="flex w-full">
            {todos.length > 1 ? (
              <button
                onClick={() => handleClear()}
                className="flex w-1/8 mr-2 md:mr-10 justify-between items-center 
              text-[#ccc] hover:text-[#eee] md:px-5 md:py-2 rounded-sm
              hover:ring-2 ring-gray-200 transition-all duration-300"
              >
                <MdClear size={"1.5rem"} />
              </button>
            ) : (
              ""
            )}

            <form onSubmit={handleSubmit} className="flex w-full">
              <input
                type="text"
                placeholder={!isValid ? "Task cannot be empty" : "Enter a task"}
                className={`bg-transparent focus:outline-none w-full border-b-2 caret-[#eee] 
              text-white ${
                !isValid
                  ? "border-red-500 placeholder-red-500"
                  : "border-[#ccc] hover:border-[#eee] focus:border-[#eee] placeholder-[#ccc] hover:placeholder-[#eee] focus:placeholder-[#aaa]"
              }`}
                name="todo"
              />

              <button
                type="submit"
                className="flex w-1/8 ml-2 md:ml-10 justify-between items-center 
              text-[#ccc] hover:text-[#eee] md:px-5 md:py-2 rounded-sm
              hover:ring-2 ring-green-200 transition-all duration-300"
              >
                <MdAdd size={"1.5rem"} />
              </button>
            </form>
          </div>
          <ul className="w-full h-full mt-5">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex justify-between my-2
                text-gray-100"
              >
                <div className="w-full flex items-center">
                  <button
                    onClick={() => handleCheck(todo.id)}
                    className={`flex w-1/8 mr-2 md:mr-10 justify-between items-center 
              text-[#ccc] hover:text-[#eee] md:px-5 md:py-2 rounded-sm
              hover:ring-2 ring-gray-200 transition-all duration-300`}
                  >
                    {todo.completed ? (
                      <MdUndo size={"1.5rem"} />
                    ) : (
                      <MdCheck size={"1.5rem"} />
                    )}
                  </button>

                  <p
                    className={`flex items-center text-lg justify-start
              rounded-lg p-2 ${
                todo.completed
                  ? "line-through text-[#aaa] bg-transparent"
                  : "bg-[#00000020] font-bold"
              }`}
                  >
                    {todo.text}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="flex w-1/8 ml-2 md:ml-10 justify-between items-center 
                  text-[#ccc] hover:text-[#eee] md:px-5 md:py-2 rounded-sm
                  hover:ring-2 ring-red-200 transition-all duration-300"
                >
                  <MdDeleteForever size={"1.5rem"} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
