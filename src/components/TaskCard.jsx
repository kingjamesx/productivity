import React, { useContext } from "react";
import deleteIcon from "../assets/icons/delete.svg";
import edit from "../assets/icons/edit.svg";
import { FormatDate } from "../hooks/FormatDate";
import { db } from "../../utils/Firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import AuthContext from "../../store/auth-context";
import Popup from "./Popup";

const TaskCard = (props) => {
  const { year, month, date } = FormatDate(props.due_date);
  const due_date = `${month} ${date}, ${year}`;

  const ctx = useContext(AuthContext);
  const docRef = doc(db, "users", sessionStorage.getItem("uid"));

  const deleteHandler = async () => {
    console.log({ ...props }, props.id);
    let todos = props.todos;

    //remove the found item from database
    const newTodos = [...todos].filter((todo) => todo.id !== props.id);

    //update database
    let tag = props.todo.tag;
    props.onDelete(newTodos, tag === "inProgress");

    if (tag !== "inProgress") {
      if (props.type === "goal") {
        // props.onDelete()
        await updateDoc(
          docRef,
          {
            goals: newTodos,
          },
          { merge: true }
        );
      } else {
        await updateDoc(
          docRef,
          {
            todos: newTodos,
          },
          { merge: true }
        );
      }
    } else {
      if (props.type === "goal") {
        await updateDoc(
          docRef,
          {
            goalsInProgress: newTodos,
          },
          { merge: true }
        );
      } else {
        await updateDoc(
          docRef,
          {
            todosInProgress: newTodos,
          },
          { merge: true }
        );
      }
    }
  };

  const editTodoHandler = () => {
    //Show popup
    ctx.editHandler(true);
    if(props.todo?.tag === 'inProgress'){
      ctx.inProgressHandler(true)
    }

    props.onEdit(props.todo);
    console.log(props.todo)
  };

  const completeTodoHandler = async () => {
    // get the id of the card and update it
    let todos = props.todos;

    //find index of todo
    const completedTodoIndex = todos.findIndex((todo) => todo.id === props.id);

    todos[completedTodoIndex] = {
      ...todos[completedTodoIndex],
      done: true,
    };

    //Remove completed todos from todos
    let newTodos = todos.filter((todo, i) => i !== completedTodoIndex);
    const completedTodo = {
      ...todos[completedTodoIndex],
      date_done: new Date(),
    };

    //Update data on clientside
    const tag = props.todo.tag;
    props.onComplete(newTodos, completedTodo, tag === "inProgress");

    try {
      if (tag !== "inProgress") {
        if (props.type === "goal") {
          await updateDoc(
            docRef,
            {
              goals: newTodos,
            },
            { merge: true }
          );
        } else {
          await updateDoc(
            docRef,
            {
              todos: newTodos,
            },
            { merge: true }
          );
        }
      } else {
        if (props.type === "goal") {
          await updateDoc(
            docRef,
            {
              goalsInProgress: newTodos,
            },
            { merge: true }
          );
        } else {
          await updateDoc(
            docRef,
            {
              todosInProgress: newTodos,
            },
            { merge: true }
          );
        }
      }
    } catch (error) {
      console.log(error);
    }

    //update completed todos
    try {
      if (props.type === "goal") {
        await updateDoc(
          docRef,
          {
            completedGoals: arrayUnion(completedTodo),
          },
          { merge: true }
        );
      } else {
        await updateDoc(
          docRef,
          {
            completeTodos: arrayUnion(completedTodo),
          },
          { merge: true }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="group bg-white rounded-lg p-4 mb-4">
      {/* {ctx.edit && <Popup  />} */}
      <div className="flex items-center justify-between pb-4">
        <div
          className={
            "rounded-[4px] text-sm px-1.5 py-1 bg-opacity-15 " +
            (props.todo?.priority?.toLowerCase() === "high"
              ? "text-[#D8727D] bg-[#D8727D]"
              : "text-[#D58D49] bg-[#DFA87433]")
          }
        >
          {/* High */}
          {props.todo?.priority}
        </div>
        <img
          onClick={deleteHandler}
          src={deleteIcon}
          alt="Delete icon"
          className="cursor-pointer"
        />
      </div>
      {/* content */}
      <div className="flex justify-between items-center">
        <div className="">
          <h3 className=" pb-3 font-bold">
            {/* Brainstorming */}
            {props.todo?.todo}
          </h3>
          <p className="text-[#787486]">
            {/* Brainstorming brings team members' diverse experience into play.{" "} */}
            {props.todo?.description}
          </p>
        </div>
        <div className="">
          <input
            onClick={completeTodoHandler}
            type="checkbox"
            className="w-[15px] h-[15px]"
          />
          {/* <input type="checkbox" className="w-[15px] h-[15px] invisible group-hover:visible " /> */}
        </div>
      </div>

      <div className="flex items-center justify-between mt-5">
        <p className="font-bold">
          Due:{" "}
          <span className="font-normal">
            {/* Jan 6, 2024 */}
            {due_date}
          </span>
        </p>
        <img
          onClick={editTodoHandler}
          src={edit}
          alt="edit icon"
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default TaskCard;
