import React, { useState, useEffect } from "react";
import Header from "./Header";
import BarChart from "./BarChart";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../utils/Firebase";

const Analytics = () => {
  const [data, setData] = useState({});
  console.log(data)
  // const [tasks, setTasks] = useState({
  //   todos: data.todos?.length,
  //   todosInProgress: data.todosInProgress?.length,
  //   completeTodos: data.completeTodos?.length,
  //   goals: data.goals?.length,
  //   goalsInProgress: data.goalsInProgress?.length,
  //   completeGoals: data.completedGoals?.length,
  // });

  let tasks = {
    todos: data.todos?.length,
    todosInProgress: data.todosInProgress?.length,
    completeTodos: data.completeTodos?.length,
    goals: data.goals?.length,
    goalsInProgress: data.goalsInProgress?.length,
    completeGoals: data.completedGoals?.length,
  };
  // console.log(typeof(tasks.todos))

  // const [userData, setUserData] = useState({

  // console.log(tasks, userData)
  // console.log(userData)
  //Fetch Tasks
  useEffect(() => {
    (async () => {
      const uid = sessionStorage.getItem("uid");

      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data());

        //Fetch tasks
        // let todos = await docSnap.data().todos
        // setTasks(() => ({
        //   ...tasks,
        //   todos: todos.length,
        // }));

        // //Fetch todos in-progress
        // let todosInProgress = await docSnap.data().todosInProgress
        // setTasks({
        //   ...tasks,
        //   todosInProgress: todosInProgress.length,
        // });

        // //Fetch completed tasks
        // let completeTodos = await docSnap.data().completeTodos
        // setTasks({
        //   ...tasks,
        //   completeTodos: completeTodos.length,
        // });

        // //Fetch goals
        // let goals = await docSnap.data().goals
        // setTasks({ ...tasks, goals: goals.length });

        // //Fetch goals in-progress
        // let goalsInProgress = await docSnap.data().goalsInProgress
        // setTasks({
        //   ...tasks,
        //   goalsInProgress: goalsInProgress.length,
        // });

        // //Fetch completed goals
        // let completedGoals = await docSnap.data().completedGoals
        // setTasks({
        //   ...tasks,
        //   completeGoals: completedGoals.length,
        // });
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    })();
  }, []);

  let userData = {
    labels: [
      "To-dos",
      "To-dos In Progress",
      "Completed To-dos",
      "Goals",
      "Goals In Progress",
      "Completed Goals",
    ],
    datasets: [
      {
        label: "Number of Tasks",
        data: [
          tasks.todos,
          tasks.todosInProgress,
          tasks.completeTodos,
          tasks.goals,
          tasks.goalsInProgress,
          tasks.completeGoals,
        ],
        // backgroundColor: ['red']
      },
    ],
  };

  return (
    <section className="md:h-screen">
      {/* <Header /> */}
      <BarChart chartData={userData} />
    </section>
  );
};

export default Analytics;
