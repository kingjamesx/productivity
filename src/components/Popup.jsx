import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import close from "../assets/icons/close.svg";
import Modal from "./Modal";
import AuthContext from "../../store/auth-context";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { db } from "../../utils/Firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

const Popup = (props) => {
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);
  //   const [todoValid, setTodoValid] = useState(false);

  //yup schema
  let userSchema = object({
    todo: string().required("To-do is required"),
    description: string().required("Description is required"),
    due_date: string().required("To-do is required"),
    // due_time: string().required("To-do is required"),
    priority: string(),
  });

  //rhf
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      todo: props?.todo?.todo,
      description: props?.todo?.description,
      due_date: props?.todo?.due_date,
      // dueTime: "",
      priority: props?.todo?.priority,
      // id: Date()
    },
  });

  const closePopupHandler = () => {
    ctx.popupHandler(false);
    ctx.editHandler(false);
  };

  const submitHandler = async (data) => {
    ctx.edit
      ? (data = { ...data, id: props.todo.id })
      : (data = { ...data, id: Date() });

    const uid = sessionStorage.getItem("uid");
    const docRef = doc(db, "users", uid);

    try {
      if (!ctx.edit) {
        console.log(data, errors);
        if (data) ctx.popupHandler(false);
        console.log(docRef.id, docRef);

        await updateDoc(
          docRef,
          {
            todos: arrayUnion(data),
          },
          { merge: true }
        );

        //get all todos
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log(docSnap.data().todos);
          props.onAddNewTodo(docSnap.data().todos);
          console.log("Document data:", docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      } else {
        ctx.editHandler(false);

        let todos = props.todos;

        //find index of edited todo by comparing that id of unedited and edited todo are the same
        const editedTodoIndex = todos.findIndex((todo) => todo.id === data.id);
        console.log(editedTodoIndex);
        //Replace the old todo with the new one
        todos.splice(editedTodoIndex, 1, data);

        //update database
        await updateDoc(
          docRef,
          {
            todos: todos,
          },
          { merge: true }
        );
        // props.onEdit({ todos: newTodos });
        console.log(data);
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
            // onChange={todoHandler}
            {...register("todo")}
            id="todo"
            type="text"
            placeholder="Read a book"
            className="p-2 h-8.5 outline-none border rounded-md"
            // value={todoData.todo}
          />
        </div>

        <div className="mt-4 flex flex-col w-[400px]">
          <label htmlFor="description" className="mb-1">
            Description
          </label>
          <input
            // onChange={descriptionHandler}
            {...register("description")}
            id="description"
            type="text"
            placeholder="Read a book"
            className="p-2 h-8.5 outline-none border rounded-md"
            // value={todoData.description}
          />
        </div>

        {/* <div className="mt-4 grid grid-cols-2 gap-4"> */}
        <div className="mt-4">
          <div className="flex flex-col w-auto">
            <label htmlFor="date" className="mb-1">
              Due Date
            </label>
            <input
              //   onChange={dueDateHandler}
              {...register("due_date")}
              id="date"
              type="date"
              //   placeholder="2017-06-01"
              className="p-2 h-8.5 outline-none border rounded-md"
              //   value={todoData.due_date}
            />
          </div>
          {/* <div className="flex flex-col w-auto">
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
          </div> */}
        </div>

        <div className="mt-4 flex flex-col w-[400px]">
          <label htmlFor="priority" className="mb-1">
            Priority
          </label>
          <select
            // onChange={priorityHandler}
            {...register("priority")}
            id="priority"
            type="text"
            placeholder="Read a book"
            className="p-2 h-8.5 outline-none border rounded-md"
            // value={todoData.priority}
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
