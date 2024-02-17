import React, { useContext, useState, useEffect } from "react";
import Header from "./Header";
import TaskCard from "./TaskCard";
import Popup from "./Popup";
import addTodo from "../assets/icons/todo-add.svg";
import addProgress from "../assets/icons/progress-add.svg";
import AuthContext from "../../store/auth-context";
import { db } from "../../utils/Firebase";
import { getDoc, doc } from "firebase/firestore";
import { get } from "react-hook-form";

const Goals = () => {
  const ctx = useContext(AuthContext);
  const [goals, setGoals] = useState([]);

  //fetch goals
  useEffect(() => {
    (async () => {
      const uid = sessionStorage.getItem("uid");

      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setGoals(docSnap.data().goals);
      } else {
        return console.log("No such document!");
      }
    })();
  }, []);

  const openPopupHandler = () => {
    ctx.popupHandler(true);
  };

  const goalDeleteHandler = (goals, inProgress = false) => {
    setGoals(goals);
  };

  return (
    <section className="h-screen relative">
      {ctx.popup && <Popup type="goal" />}

      <Header />

      {/* main */}
      <div className="todo-big-container">
        {/* goals */}
        <div className="todo-container">
          {/* header */}
          <div className="task-container-header  ">
            <div className="task-container-header-right">
              <div className="flex items-center gap-2">
                <div className="circle-small bg-blue-500"></div>
                <p className="text-lg">Goals</p>
              </div>
              <div className="total-task">{goals?.length}</div>
            </div>
            <button onClick={openPopupHandler} className="add-task">
              <img src={addTodo} alt="Add icon" className="cursor-pointer" />
            </button>
          </div>
          <div className="task-header-border"></div>

          {/* goals main */}
          {goals.map((goal) => (
            <TaskCard
              type="goal"
              key={goal.id}
              id={goal.id}
              todo={goal}
              todos={goals}
              onDelete={goalDeleteHandler}
            />
          ))}
        </div>

        {/* goals in-progress */}
        <div className="todo-container">
          {/* header */}
          <div className="task-container-header">
            <div className="task-container-header-right">
              <div className="flex items-center gap-2">
                <div className="circle-small bg-[#FFA500]"></div>
                <p className="text-lg">In progress</p>
              </div>
              <div className="total-task">
                3{/* {todosInProgress.length} */}
              </div>
            </div>
            <button className="add-inprogress">
              <img
                // onClick={openPopupInProgressHandler}
                src={addProgress}
                alt="add icon"
                className="cursor-pointer"
              />
            </button>
          </div>
          <div className="inprogress-header-border"></div>

          {/* goals in-progress main */}
          <TaskCard />
        </div>
        {/* goals */}
        <div className="todo-container">
          {/* header */}
          <div className="task-container-header">
            <div className="task-container-header-right">
              <div className="flex items-center gap-2">
                <div className="circle-small bg-[#8BC48A]"></div>
                <p className="text-lg">Done</p>
              </div>
              <div className="total-task">3{/* {completedTodos.length} */}</div>
            </div>
          </div>
          <div className="done-header-border"></div>

          <TaskCard />
        </div>
      </div>
    </section>
  );
};

export default Goals;
