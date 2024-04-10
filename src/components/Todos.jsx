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
// import SidebarMobile from "./SidebarMobile";

const Todos = (props) => {
  const ctx = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [todosInProgress, setTodosInProgress] = useState([]);
  const [todoEdit, setTodoEdit] = useState({});

  // const [openSidebar, setOpenSidebar] = useState(false);

  // const sidebarToggleHandler = (val) => {
  //   setOpenSidebar(val);
  // };

  //Fetch todos
  useEffect(() => {
    (async () => {
      const uid = sessionStorage.getItem("uid");

      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        //Fetch tasks
        setTodos(() => docSnap.data().todos || []);

        //Fetch todos in-progress
        setTodosInProgress(() => docSnap.data().todosInProgress || []);

        //Fetch completed tasks
        setCompletedTodos(docSnap.data().completeTodos || []);
      } else {
        console.log("No such document!");
      }
    })();
  }, []);

  const openPopupHandler = () => {
    ctx.popupHandler(true);
  };

  const openPopupInProgressHandler = () => {
    ctx.inProgressHandler(true);
    // ctx.taskTypeHandler("");
  };

  const newTodoHandler = (todo) => {
    console.log(todos);
    setTodos([...todos, todo]);
  };

  const todoInProgressHandler = (todo) => {
    setTodosInProgress([...todosInProgress, todo]);
    // ctx.inProgressHandler(true);
  };

  const deleteTodoHandler = (todos, inProgress = false) => {
    !inProgress ? setTodos(todos) : setTodosInProgress(todos);
    // setTodos(todos);
    // console.log(this.todo);
  };

  const editTodoHandler = (todo) => {
    // ctx.taskTypeHandler("");
    setTodoEdit(todo);
    ctx.editHandler(true);
  };

  const completeTodoHandler = (todos, completedTodo, inProgress = false) => {
    !inProgress ? setTodos(todos) : setTodosInProgress(todos);
    setCompletedTodos([...completedTodos, completedTodo]);
  };

  return (
    <section className="z-[1] md:z-0 h-screen relative">
      {/* {openSidebar && <SidebarMobile  />} */}

      {ctx.popup && (
        <Popup onEdit={editTodoHandler} onAddNewTodo={newTodoHandler} />
      )}
      {ctx.inProgress && ctx.taskType !== "goal" && (
        <Popup onAddTodoInProgress={todoInProgressHandler} />
      )}
      {ctx.edit && ctx.taskType !== "goal" && (
        <Popup
          todos={ctx.inProgress ? todosInProgress : todos}
          todo={todoEdit}
          onEdit={editTodoHandler}
          onAddNewTodo={newTodoHandler}
        />
      )}

      {/* header */}
      {/* <Header isOpen={openSidebar} onSidebarToggle={sidebarToggleHandler} /> */}
      {/* <h2 className="text-5xl font-bold mb-14">Todos</h2> */}

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
                {todos?.length ? todos?.length : 0}
              </div>
            </div>
            <button className="add-task">
              <img
                onClick={openPopupHandler}
                src={addTodo}
                alt="Add icon"
                className="cursor-pointer"
              />
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
                {todosInProgress?.length ? todosInProgress?.length : 0}
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
                {completedTodos?.length ? completedTodos?.length : 0}
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
