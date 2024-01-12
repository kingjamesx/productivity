import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import lock from "../assets/icons/lock.svg";
import user from "../assets/icons/user.svg";
import email from "../assets/icons/email-1.png";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app, db } from "../../utils/Firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";


const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [registerData, setRegisterData] = useState({});
  const [registrationError, setRegistrationError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const auth = getAuth(app);
  console.log(typeof errorMessage, registrationError);

  //yup schema
  const userSchema = object({
    email: string().email().required("Email Address is required"),
    username: string()
      .required("Username is required")
      .min(2, "Valid username is required"),
    password: string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  // rhf
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });

  //store registration data
  // const storeUserData = (userData) => {
  //   addDoc(collection(db, "users"), userData)
  //     .then((data) => {
  //       console.log("Document written with ID: ", data.id);
  //     })
  //     .catch((e) => {
  //       {
  //         console.error("Error adding document: ", e);
  //       }
  //     });
  // };

  const registerUserHandler = async (data) => {
    console.log(data);
    setIsLoading(true);
    setRegisterData(data);

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const user = userCredential.user;
    console.log(user);

    //create a db using the uid as the doc Id
    try {
      await setDoc(doc(db, "users", user.uid), {
        email: data.email,
        username: data.username,
      });
      console.log("yayyyyyyy");
    } catch (err) {
      console.log(err);
      setRegistrationError(true);
    }

    try {
      if (!registrationError) {
        navigate("/main");
        setIsLoading(false);
        toast.success("Welcome!");
        return user;
      } else {
        setIsLoading(false);
        // return;
      }
    } catch (error) {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;

      setErrorMessage(errorCode);
      setIsLoading(false);
      toast.error(errorCode);
      console.log(errorMessage, errorCode);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center bg-blue-500 bg-opacity-35 bg-bg-login w-[100%] h-screen">
      <form
        onSubmit={handleSubmit(registerUserHandler)}
        action="submit"
        className="text-base flex flex-col"
      >
        <div className="flex items-center mb-5 w-[500px] h-14">
          <div className="h-14">
            <img
              src={email}
              alt="email icon"
              className="pl-3 pr-5 py-[15px] border border-r-0 border-white rounded-tl-[4px] rounded-bl-[4px]"
            />
          </div>
          <input
            {...register("email")}
            type="email"
            placeholder="EMAIL"
            className="placeholder:text-white py-3 h-14 w-full  bg-none bg-transparent bg-opacity-35 outline-none border border-l-0 border-white rounded-br-[4px] rounded-tr-[4px]"
          />
        </div>
        <p className="text-red-500 -mt-3 mb-3 ">{errors?.email?.message}</p>

        <div className="flex items-center mb-5 w-[500px] h-14">
          <div className="h-full">
            <img
              src={user}
              alt="user icon"
              className="pl-3 pr-5 py-3 h-14 border border-r-0 border-white rounded-tl-[4px] rounded-bl-[4px]"
            />
          </div>
          <input
            {...register("username")}
            type="text"
            placeholder="USERNAME"
            className=" placeholder:text-white py-3 h-14 w-full  bg-transparent outline-none border border-l-0 border-white rounded-br-[4px] rounded-tr-[4px]"
          />
        </div>
        <p className="text-red-500 -mt-3 mb-3 ">{errors?.username?.message}</p>

        <div className="flex items-center mb-5 w-[500px] h-14">
          <div className="h-full">
            <img
              src={lock}
              alt="password icon"
              className="pl-3 pr-5 py-3 h-14 border border-r-0 border-white rounded-tl-[4px] rounded-bl-[4px]"
            />
          </div>
          <input
            {...register("password")}
            type="password"
            placeholder="PASSWORD"
            className="h-14 placeholder:text-white py-3 w-full bg-transparent outline-none border border-l-0 border-white rounded-br-[4px] rounded-tr-[4px]"
          />
        </div>
        <p className="text-red-500 -mt-3 mb-3 ">{errors?.password?.message}</p>

        <button className="h-14 bg-white text-[#2148C0] rounded-[4px]">
          {isLoading ? "SIGNING UP..." : "SIGN UP"}
        </button>
      </form>
      <p className="text-base text-center text-white my-3">OR</p>
      <button className="text-base h-14 border w-[500px] border-white text-white rounded-[4px]">
        SIGN UP WITH GOOGLE
      </button>
    </section>
  );
};

export default Signup;
