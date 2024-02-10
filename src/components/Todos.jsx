import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import TaskCard from "./TaskCard";
import TaskDoneCard from "./TaskDoneCard";
import Popup from "./Popup";
import addTodo from "../assets/icons/todo-add.svg";
import addProgress from "../assets/icons/progress-add.svg";
import AuthContext from "../../store/auth-context";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../utils/Firebase";

const Todos = (props) => {
  const ctx = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  const [todoEdit, setTodoEdit] = useState({});

  useEffect(() => {
    (async () => {
      const uid = sessionStorage.getItem("uid");

      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        //Fetch tasks
        setTodos(() => docSnap.data().todos);

        //Fetch completed tasks
        setCompletedTodos(docSnap.data().completeTodos);
        console.log(docSnap.data().completeTodos);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    })();
  }, []);

  const openPopupHandler = () => {
    ctx.popupHandler(true);
  };

  const newTodoHandler = (todo) => {
    // ctx.editHandler(false)
    setTodos(todo);
  };

  const deleteTodoHandler = (todos) => {
    setTodos(todos);
  };

  const editTodoHandler = (todo) => {
    setTodoEdit(todo);
    // setTodos(todos)
    // console.log(todo);
  };

  const completeTodoHandler = (todos, completedTodo) => {
    setTodos(todos);
    setCompletedTodos((prev) => [...prev, completedTodo]);
  };

  return (
    <section className="h-screen relative">
      {ctx.popup && (
        <Popup onEdit={editTodoHandler} onAddNewTodo={newTodoHandler} />
      )}
      {ctx.edit && (
        <Popup
          todos={todos}
          todo={todoEdit}
          onEdit={editTodoHandler}
          onAddNewTodo={newTodoHandler}
        />
      )}
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
                {/* 3 */}
                {todos?.length}
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
          {todos?.map((todo, i) => (
            <TaskCard
              key={todo.id}
              todo={todo}
              todos={todos}
              id={todo.id}
              title={todo.todo}
              description={todo.description}
              priority={todo.priority}
              due_date={todo.due_date}
              onDelete={deleteTodoHandler}
              onEdit={editTodoHandler}
              onComplete={completeTodoHandler}
            />
          ))}
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
                {completedTodos.length}
              </div>
            </div>
            {/* <button className="w-6 h-6 rounded-md bg-slate-300"></button> */}
          </div>
          <div className="rounded-full mt-3 mb-4 h-1 bg-[#8BC48A] w-full"></div>
          {completedTodos?.map((todo) => (
            <TaskDoneCard key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Todos;
