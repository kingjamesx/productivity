import React, { useContext, useState, useEffect } from "react";
import Header from "./Header";
import TaskCard from "./TaskCard";
import TaskDoneCard from "./TaskDoneCard";
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
  const [goalEdit, setGoalEdit] = useState({});
  const [completedGoals, setCompletedGoals] = useState([]);
  const [goalsInProgress, setGoalsInProgress] = useState([]);

  //fetch goals
  useEffect(() => {
    (async () => {
      const uid = sessionStorage.getItem("uid");

      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      //fetch goals
      if (docSnap.exists()) {
        setGoals(docSnap.data().goals || []);
      } else {
        return console.log("No such document!");
      }

      //fetch completed goals
      // if (completedGoals.length === 0) {
      if (docSnap.exists()) {
        setCompletedGoals(docSnap.data().completedGoals || []);
      } else {
        return console.log("No such document!");
      }
      // }else{return}

      //fetch goals in progress
      if (docSnap.exists()) {
        setGoalsInProgress(docSnap.data().goalsInProgress || []);
      } else {
        return console.log("No such document!");
      }
    })();
  }, []);

  const openPopupHandler = () => {
    ctx.popupHandler(true);
  };

  const newGoalHandler = (goal) => {
    setGoals([...goals, goal]);
    ctx.inProgressHandler(false);
  };

  const deleteGoalHandler = (goals, inProgress = false) => {
    inProgress ? setGoalsInProgress(goals) : setGoals(goals);
  };

  const completeGoalHandler = (goals, completedGoal, inProgress = false) => {
    inProgress ? setGoalsInProgress(goals) : setGoals(goals);
    setCompletedGoals((prev) => [...prev, completedGoal]);
  };

  const editGoalHandler = (goal) => {
    ctx.taskTypeHandler("goal");
    ctx.editHandler(true);
    setGoalEdit(goal);
  };

  const goalInProgressPopupHandler = () => {
    ctx.inProgressHandler(true);
    ctx.taskTypeHandler("goal");
    // ctx.popupHandler(true)
    // ctx.taskTypeHandler()
  };

  const addGoalInProgressHandler = (goal) => {
    setGoalsInProgress([...goalsInProgress, goal]);
    ctx.inProgressHandler(true);
    ctx.taskTypeHandler("goal");
  };
  // || (ctx.inProgress && ctx.taskType === "goal" && ctx.edit) z-[-1] md:z-0
  return (
    <section className=" md:h-screen relative">
      {ctx.popup && <Popup onAddNewGoal={newGoalHandler} type="goal" />}
      {ctx.edit && ctx.taskType === "goal" && (
        <Popup todos={goals} todo={goalEdit} />
      )}
      {ctx.inProgress && ctx.taskType === "goal" && (
        <Popup
          todo={goalEdit}
          todos={goalsInProgress}
          onAddTodoInProgress={addGoalInProgressHandler}
          type="goal_in_progress"
        />
      )}

      {/* <Header /> */}

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
              <div className="total-task">
                {goals?.length ? goals?.length : 0}
              </div>
            </div>
            <button onClick={openPopupHandler} className="add-task">
              <img src={addTodo} alt="Add icon" className="cursor-pointer" />
            </button>
          </div>
          <div className="task-header-border"></div>

          {/* goals main */}
          {goals?.map((goal) => (
            <TaskCard
              type="goal"
              key={goal.id}
              id={goal.id}
              todo={goal}
              todos={goals}
              onDelete={deleteGoalHandler}
              onComplete={completeGoalHandler}
              onEdit={editGoalHandler}
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
                {goalsInProgress?.length ? goalsInProgress?.length : 0}
              </div>
            </div>
            <button className="add-inprogress">
              <img
                onClick={goalInProgressPopupHandler}
                src={addProgress}
                alt="add icon"
                className="cursor-pointer"
              />
            </button>
          </div>
          <div className="inprogress-header-border"></div>

          {/* goals in-progress main */}
          {goalsInProgress?.map((goal) => (
            <TaskCard
              type="goal"
              key={goal.id}
              id={goal.id}
              todo={goal}
              todos={goalsInProgress}
              onDelete={deleteGoalHandler}
              onComplete={completeGoalHandler}
              onEdit={editGoalHandler}
            />
          ))}
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
              <div className="total-task">
                {completedGoals?.length ? completedGoals?.length : 0}
              </div>
            </div>
          </div>
          <div className="done-header-border"></div>

          {completedGoals?.map((goal) => (
            <TaskDoneCard key={goal.id} todo={goal} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Goals;
