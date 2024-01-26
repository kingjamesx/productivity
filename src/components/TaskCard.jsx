import React from "react";
import deleteIcon from "../assets/icons/delete.svg";
import edit from "../assets/icons/edit.svg";
import { FormatDate } from "../hooks/FormatDate";
import { db } from "../../utils/Firebase";
import { doc, updateDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";

const TaskCard = (props) => {
  const { year, month, date } = FormatDate(props.due_date);
  const due_date = `${month} ${date}, ${year}`;

  //   const cityRef = db.collection('cities').doc('DC');

  // // Set the 'capital' field of the city
  // const res = await cityRef.update({capital: true});

  const deleteHandler = async () => {
    console.log({ ...props }, props.id);
    let todos = props.todos;

    //remove the found item from database
    const newTodos = [...todos].filter((todo) => todo.id !== props.id);
    console.log(newTodos);

    //update database
    const docRef = doc(db, "users", sessionStorage.getItem("uid"));
    props.onDelete(newTodos);
    await updateDoc(
      docRef,
      {
        todos: newTodos,
      },
      { merge: true }
    );
  };

  return (
    <div className="bg-white rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between pb-4">
        <div
          className={
            "rounded-[4px] px-1.5 py-1 bg-opacity-15 " +
            (props.priority.toLowerCase() === "high"
              ? "text-[#D8727D] bg-[#D8727D]"
              : "text-[#D58D49] bg-[#DFA87433]")
          }
        >
          {/* High */}
          {props.priority}
        </div>
        <img
          onClick={deleteHandler}
          src={deleteIcon}
          alt="Delete icon"
          className="cursor-pointer"
        />
      </div>
      {/* content */}
      <div className="">
        <h3 className="text-lg pb-3 font-bold">
          {/* Brainstorming */}
          {props.title}
        </h3>
        <p className="text-[#787486]">
          {/* Brainstorming brings team members' diverse experience into play.{" "} */}
          {props.description}
        </p>
      </div>

      <div className="flex items-center justify-between mt-5">
        <p className="font-bold">
          Due:{" "}
          <span className="font-normal">
            {/* Jan 6, 2024 */}
            {due_date}
          </span>
        </p>
        <img src={edit} alt="edit icon" className="cursor-pointer" />
      </div>
    </div>
  );
};

export default TaskCard;
