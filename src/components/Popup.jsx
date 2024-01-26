import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import close from "../assets/icons/close.svg";
import Modal from "./Modal";
import AuthContext from "../../store/auth-context";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// import { collection, addDoc } from "firebase/firestore";
import { db } from "../../utils/Firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

const Popup = (props) => {
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);
  const [todoValid, setTodoValid] = useState(false);
  const [todoData, setTodoData] = useState({
    todo: "",
    description: "",
    dueDate: "",
    dueTime: "",
    priority: "",
  });

  //yup schema
  let userSchema = object({
    todo: string().required("To-do is required"),
    description: string().required("Description is required"),
    due_date: string().required("To-do is required"),
    due_time: string().required("To-do is required"),
    priority: string(),
  });

  //rhf
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });

  const closePopupHandler = () => {
    ctx.popupHandler(false);
  };

  const submitHandler = async (data) => {
    try {
      console.log(data, errors);
      if (data) ctx.popupHandler(false);

      //   const docRef = await addDoc(collection(db, "users"), {todos:[data]});
      const uid = sessionStorage.getItem("uid");
      const docRef = doc(db, "users", uid);
    //   await setDoc(docRef, { todos: [] });
      console.log(docRef.id, docRef);
      //   setDoc(cityRef, { capital: true }, { merge: true })
      await updateDoc(
        docRef,
        {
          todos: arrayUnion(data),
        },
        { merge: true }
      );

      //get all todos
    //   const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data().todos);
        props.onAddNewTodo(docSnap.data().todos)
        console.log("Document data:", docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      //   onClick={closePopupHandler}
      className="absolute z-[10000] flex justify-center items-center h-screen mt-[-28px] ml-[calc(16.67%+32px)] "
    >
      <Modal onClose={closePopupHandler}></Modal>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="bg-white rounded-lg p-4 pt-2 z-[100000000000000000]   "
      >
        <div className="flex item-center justify-between mb-3">
          <h4 className="font-bold text-lg">Create To-do</h4>
          <img
            className="cursor-pointer"
            src={close}
            alt="close icon"
            onClick={closePopupHandler}
          />
        </div>

        <div className="flex flex-col w-[400px]">
          <label htmlFor="to-do" className="mb-1">
            To-do
          </label>
          <input
            {...register("todo")}
            id="todo"
            type="text"
            placeholder="Read a book"
            className="p-2 h-8.5 outline-none border rounded-md"
          />
        </div>

        <div className="mt-4 flex flex-col w-[400px]">
          <label htmlFor="description" className="mb-1">
            Description
          </label>
          <input
            {...register("description")}
            id="description"
            type="text"
            placeholder="Read a book"
            className="p-2 h-8.5 outline-none border rounded-md"
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex flex-col w-auto">
            <label htmlFor="date" className="mb-1">
              Due Date
            </label>
            <input
              {...register("due_date")}
              id="date"
              type="date"
              //   placeholder="2017-06-01"
              className="p-2 h-8.5 outline-none border rounded-md"
            />
          </div>
          <div className="flex flex-col w-auto">
            <label htmlFor="time" className="mb-1">
              Due time
            </label>
            <input
              {...register("due_time")}
              id="time"
              type="time"
              //   onFocus="this.type='time'"
              placeholder="00:00"
              className="p-2 h-8.5 outline-none border rounded-md"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-col w-[400px]">
          <label htmlFor="priority" className="mb-1">
            Priority
          </label>
          <select
            {...register("priority")}
            id="priority"
            type="text"
            placeholder="Read a book"
            className="p-2 h-8.5 outline-none border rounded-md"
          >
            <option>High</option>
            <option>Low</option>
          </select>
        </div>

        <button className="bg-blue-500 rounded-md h-8.5 mt-5 p-2 text-center w-full">
          Create
        </button>
      </form>
    </div>
  );
};

export default Popup;
