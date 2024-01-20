import React, { useContext } from "react";
import Header from "./Header";
import TaskCard from "./TaskCard";
import addTodo from "../assets/icons/todo-add.svg";
import addProgress from "../assets/icons/progress-add.svg";
import AuthContext from "../../store/auth-context";

const Todos = (props) => {
  const ctx = useContext(AuthContext);

  const openPopupHandler = () => {
    ctx.popupHandler(true);
  };

  return (
    <section className="h-screen ">
      <Header />
      <div className="grid grid-cols-3 gap-6 h-full text-base ">
        {/* todos */}
        <div className="todo-container ">
          {/* todo-header */}
          <div className="flex items-center justify-between px-2  ">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                <p className="text-lg">To-dos</p>
              </div>
              <div className="text-base flex items-center justify-center w-5 h-5 rounded-full text-[#625F6D] bg-[#E0E0E0]">
                3
              </div>
            </div>
            <button
              onClick={openPopupHandler}
              className="flex items-center justify-center w-6 h-6 rounded-md bg-blue-500 bg-opacity-15"
            >
              <img src={addTodo} alt="Add icon" className="cursor-pointer" />
            </button>
          </div>
          <div className="rounded-full mt-3 mb-4 h-1 bg-blue-500 w-full"></div>
          {/* to-dos main */}
          <TaskCard />
        </div>
        {/* In-progress */}
        <div className="todo-container ">
          <div className="flex items-center justify-between px-2  ">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFA500]"></div>
                <p className="text-lg">In progress</p>
              </div>
              <div className="text-base flex items-center justify-center w-5 h-5 rounded-full text-[#625F6D] bg-[#E0E0E0]">
                3
              </div>
            </div>
            <button className="flex items-center justify-center w-6 h-6 rounded-md bg-opacity-15 bg-[#FFA500]">
              <img
                src={addProgress}
                alt="add icon"
                className="cursor-pointer"
              />
            </button>
          </div>
          <div className="rounded-full mt-3 h-1 bg-[#FFA500] w-full"></div>
        </div>
        {/* done */}
        <div className="todo-container ">
          <div className="flex items-center justify-between px-2  ">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#8BC48A]"></div>
                <p className="text-lg">Done</p>
              </div>
              <div className="text-base flex items-center justify-center w-5 h-5 rounded-full text-[#625F6D] bg-[#E0E0E0]">
                3
              </div>
            </div>
            {/* <button className="w-6 h-6 rounded-md bg-slate-300"></button> */}
          </div>
          <div className="rounded-full mt-3 h-1 bg-[#8BC48A] w-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Todos;
