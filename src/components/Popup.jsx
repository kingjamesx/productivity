import React, { useContext } from "react";
import close from "../assets/icons/close.svg";
import Modal from "./Modal";
import AuthContext from "../../store/auth-context";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { db } from "../../utils/Firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

const Popup = (props) => {
  const ctx = useContext(AuthContext);

  //yup schema
  let userSchema = object({
    todo: string().required("To-do is required"),
    description: string().required("Description is required"),
    due_date: string().required("Due date is required"),
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
      priority: props?.todo?.priority,
    },
  });

  const closePopupHandler = () => {
    ctx.popupHandler(false);
    ctx.editHandler(false);
    ctx.inProgressHandler(false);
    ctx.taskTypeHandler("");
  };

  const submitHandler = async (data) => {
    ctx.edit
      ? (data = { ...data, tag: props.todo.tag, id: props.todo.id })
      : (data = {
          ...data,
          id: Date(),
          done: false,
          tag: ctx.inProgress ? "inProgress" : "todo",
        });

    const uid = sessionStorage.getItem("uid");
    const docRef = doc(db, "users", uid);

    //update database
    try {
      if (!ctx.edit) {
        // console.log(data, errors);

        if (data && ctx.popup && !ctx.inProgress) {
          ctx.popupHandler(false);

          if (props.type === "goal") {
            //Update client data
            props.onAddNewGoal( data);
            await updateDoc(
              docRef,
              {
                goals: arrayUnion(data),
              },
              { merge: true }
            );
          } else {
            //Update client data
            props.onAddNewTodo(data);

            await updateDoc(
              docRef,
              {
                todos: arrayUnion(data),
              },
              { merge: true }
            );
          }

          //get all todos
          // const docSnap = await getDoc(docRef);

          // if (docSnap.exists()) {
          //   console.log(docSnap.data().todos);
          //   props.onAddNewTodo(docSnap.data().todos);
          //   // console.log("Document data:", docSnap.data());
          // } else {
          //   console.log("No such document!");
          // }
        } else if (data && ctx.inProgress && !ctx.popup) {
          // console.log("inProgresssssssss", data, ctx.inProgress);
          ctx.inProgressHandler(false);
          ctx.editHandler(false);
          // ctx.inProgressHandler(false);
          ctx.popupHandler(false);
          ctx.taskTypeHandler("");

          props.onAddTodoInProgress(data);

          //update todos in-progress
          if (props.type === "goal_in_progress") {
            try {
              await updateDoc(
                docRef,
                {
                  goalsInProgress: arrayUnion(data),
                },
                { merge: true }
              );
            } catch (error) {
              console.log(error);
            }
          } else {
            try {
              await updateDoc(
                docRef,
                {
                  todosInProgress: arrayUnion(data),
                },
                { merge: true }
              );
            } catch (error) {
              console.log(error);
            }
          }
        }
        // console.log(docRef.id, docRef);
      } else {
        ctx.editHandler(false);
        // ctx.taskTypeHandler('')

        let todos = props.todos;

        //find index of edited todo by comparing that id of unedited and edited todo are the same
        const editedTodoIndex = todos.findIndex((todo) => todo.id === data.id);

        //Replace the old todo with the new one
        todos.splice(editedTodoIndex, 1, data);

        //update database
        if (ctx.taskType === "goal") {
          if (props.todo.tag === "inProgress") {
            await updateDoc(
              docRef,
              {
                goalsInProgress: todos,
              },
              { merge: true }
            );
          } else {
            await updateDoc(
              docRef,
              {
                goals: todos,
              },
              { merge: true }
            );
          }
          // await updateDoc(
          //   docRef,
          //   {
          //     goals: todos,
          //   },
          //   { merge: true }
          // );
          ctx.taskTypeHandler("");
        } else {
          if(props.todo.tag === 'inProgress'){
            await updateDoc(
              docRef,
              {
                todosInProgress: todos,
              },
              { merge: true }
            );
          }else{await updateDoc(
            docRef,
            {
              todos: todos,
            },
            { merge: true }
          );}
          // await updateDoc(
          //   docRef,
          //   {
          //     todos: todos,
          //   },
          //   { merge: true }
          // );
        }
      }
      ctx.editHandler(false);
      ctx.inProgressHandler(false);
      ctx.popupHandler(false);
      ctx.taskTypeHandler("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="absolute z-[10000] flex justify-center items-center w-[5/6] h-screen lg:mt-[-28px] lg:ml-[calc(16.67%+32px)] ">
      <Modal onClose={closePopupHandler}></Modal>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="bg-white rounded-lg p-4 pt-2 z-[100000000000000000]"
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

        <div className="flex flex-col w-[250px] md:w-[400px]">
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

        <div className="mt-4 flex flex-col w-[250px] md:w-[400px]">
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

        {/* <div className="mt-4 grid grid-cols-2 gap-4"> */}
        <div className="mt-4">
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

        <div className="mt-4 flex flex-col w-[250px] md:w-[400px]">
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
