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
  const [todosInProgress, setTodosInProgress] = useState([]);
  const [todoEdit, setTodoEdit] = useState({});

  //Fetch todos
  useEffect(() => {
    (async () => {
      const uid = sessionStorage.getItem("uid");

      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        //Fetch tasks
        setTodos(() => docSnap.data().todos);

        //Fetch todos in-progress
        setTodosInProgress(() => docSnap.data().todosInProgress);

        //Fetch completed tasks
        setCompletedTodos(docSnap.data().completeTodos);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    })();
  }, []);

  const openPopupHandler = () => {
    ctx.popupHandler(true);
  };

  const openPopupInProgressHandler = () => {
    ctx.inProgressHandler(true);
  };

  const newTodoHandler = (todo) => {
    setTodos(todo);
  };

  const todoInProgressHandler = (todo) => {
    setTodosInProgress(todo);
  };

  const deleteTodoHandler = (todos, inProgress = false) => {
    !inProgress ? setTodos(todos) : setTodosInProgress(todos);
    // setTodos(todos);
    // console.log(this.todo);
  };

  const editTodoHandler = (todo) => {
    setTodoEdit(todo);
  };

  const completeTodoHandler = (todos, completedTodo, inProgress = false) => {
    !inProgress ? setTodos(todos) : setTodosInProgress(todos);
    setCompletedTodos((prev) => [...prev, completedTodo]);
  };

  return (
    <section className="h-screen relative">
      {ctx.popup && (
        <Popup onEdit={editTodoHandler} onAddNewTodo={newTodoHandler} />
      )}
      {ctx.inProgress && <Popup onAddTodoInProgress={todoInProgressHandler} />}
      {ctx.edit && (
        <Popup
          todos={todos}
          todo={todoEdit}
          onEdit={editTodoHandler}
          onAddNewTodo={newTodoHandler}
        />
      )}
      <Header />
      <div className="todo-big-container ">
        {/* todos */}
        <div className="todo-container ">
          {/* todo-header */}
          <div className="task-container-header  ">
            <div className="task-container-header-right">
              <div className="flex items-center gap-2">
                <div className="circle-small bg-blue-500"></div>
                <p className="text-lg">To-dos</p>
              </div>
              <div className="total-task">
                {/* 3 */}
                {todos?.length}
              </div>
            </div>
            <button
              onClick={openPopupHandler}
              className="add-task"
            >
              <img src={addTodo} alt="Add icon" className="cursor-pointer" />
            </button>
          </div>
          <div className="task-header-border"></div>
          {/* to-dos main */}
          {todos?.map((todo, i) => (
            <TaskCard
              key={todo.id}
              todo={todo}
              todos={todos}
              id={todo.id}
              // title={todo.todo}
              // description={todo.description}
              // priority={todo.priority}
              // due_date={todo.due_date}
              onDelete={deleteTodoHandler}
              onEdit={editTodoHandler}
              onComplete={completeTodoHandler}
            />
          ))}
        </div>
        {/* In-progress */}
        <div className="todo-container ">
          <div className="task-container-header  ">
            <div className="task-container-header-right">
              <div className="flex items-center gap-2">
                <div className="circle-small bg-[#FFA500]"></div>
                <p className="text-lg">In progress</p>
              </div>
              <div className="total-task">
                {todosInProgress.length}
              </div>
            </div>
            <button className="add-inprogress">
              <img
                onClick={openPopupInProgressHandler}
                src={addProgress}
                alt="add icon"
                className="cursor-pointer"
              />
            </button>
          </div>
          <div className="inprogress-header-border"></div>
          {todosInProgress?.map((todo) => (
            <TaskCard
              key={todo.id}
              id={todo.id}
              todo={todo}
              todos={todosInProgress}
              onDelete={deleteTodoHandler}
              onEdit={editTodoHandler}
              onComplete={completeTodoHandler}
            />
          ))}
        </div>
        {/* done */}
        <div className="todo-container ">
          <div className="task-container-header  ">
            <div className="task-container-header-right">
              <div className="flex items-center gap-2">
                <div className="circle-small bg-[#8BC48A]"></div>
                <p className="text-lg">Done</p>
              </div>
              <div className="total-task">
                {completedTodos.length}
              </div>
            </div>
            {/* <button className="w-6 h-6 rounded-md bg-slate-300"></button> */}
          </div>
          <div className="done-header-border"></div>
          {completedTodos?.map((todo) => (
            <TaskDoneCard key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Todos;
