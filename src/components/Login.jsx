import React from "react";
import { Link } from "react-router-dom";
import lock from "../assets/icons/lock.svg";
import user from "../assets/icons/user.svg";
import email from "../assets/icons/email-1.png";

const Login = () => {
  return (
    <section className="flex items-center justify-center bg-[#2148C0] bg-bg-login w-[100%] h-screen">
      <form action="" className="text-base flex flex-col">
        <div className="flex items-center mb-5 w-[500px] h-14">
          <div className="h-14">
            <img
              src={email}
              alt="email icon"
              className="pl-3 pr-5 py-[15px] border border-r-0 border-white rounded-tl-[4px] rounded-bl-[4px]"
            />
          </div>
          <input
            type="email"
            placeholder="EMAIL"
            className="placeholder:text-white py-3 h-14 w-full  bg-transparent outline-none border border-l-0 border-white rounded-br-[4px] rounded-tr-[4px]"
          />
        </div>
        {/* <div className="flex items-center mb-5 w-[500px] h-14">
          <div className="h-full">
            <img
              src={user}
              alt="user icon"
              className="pl-3 pr-5 py-3 h-14 border border-r-0 border-white rounded-tl-[4px] rounded-bl-[4px]"
            />
          </div>
          <input
            type="text"
            placeholder="USERNAME"
            className=" placeholder:text-white py-3 h-14 w-full  bg-transparent outline-none border border-l-0 border-white rounded-br-[4px] rounded-tr-[4px]"
          />
        </div> */}

        <div className="flex items-center mb-5 w-[500px] h-14">
          <div className="h-full">
            <img
              src={lock}
              alt="password icon"
              className="pl-3 pr-5 py-3 h-14 border border-r-0 border-white rounded-tl-[4px] rounded-bl-[4px]"
            />
          </div>
          <input
            type="password"
            placeholder="PASSWORD"
            className="h-14 placeholder:text-white py-3 w-full bg-transparent outline-none border border-l-0 border-white rounded-br-[4px] rounded-tr-[4px]"
          />
        </div>

        <Link to="/main">
          <button className="h-14 w-full bg-white text-[#2148C0] rounded-[4px]">
            LOGIN
          </button>
        </Link>
        <p className="text-center text-white my-3">OR</p>
        <button className="h-14 border border-white text-white rounded-[4px]">
          SIGNIN WITH GOOGLE
        </button>
      </form>
    </section>
  );
};

export default Login;
