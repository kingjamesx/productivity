import React from "react";
import { NavLink } from "react-router-dom";
import star from "../assets/icons/star.png";
// import todo from "../assets/icons/todo.png";
// import home from "../assets/icons/home.png";
import { FaHome, FaTasks } from "react-icons/fa";
import Modal from "./Modal";

const SidebarMobile = (props) => {
   const closeSidebarHandler = ()=>{
    props.onClose(false)
   }
  return (
    <div>
      <Modal />
      <div className="bg-white w-2/3 absolute z-100000 top-[-12px] left-[-16px] border-black text-lg  pt-8 pb-[50px] flex flex-col items-center justify-between h-screen shadow-[7px_-1px_12px_0_rgba(0,0,0,0.11)]">
        {/* close svg */}
        <div onClick={closeSidebarHandler} className="flex self-end">
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="ui-svg-inline"
          >
            <path d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path>
          </svg>
        </div>

        <div className="flex flex-col gap-9">
          <NavLink
            to="/main/home"
            className={({ isActive }) => (isActive ? "nav-active" : "nav")}
          >
            <FaHome />
            {/* <img src={home} alt="Home Icon" className="h-5 w-5" /> */}
            Home
          </NavLink>
          <NavLink
            to="/main/to-dos"
            className={({ isActive }) => (isActive ? "nav-active" : "nav")}
          >
            {/* <img src={todo} alt="Todo Icon" className="h-5 w-5" /> */}
            <FaTasks />
            To-dos
          </NavLink>
          <NavLink
            to="/main/goals"
            // style={{ display: "flex" }}
            className={({ isActive }) => (isActive ? "nav-active" : "nav")}
          >
            <img src={star} alt="Goal Icon" className="h-5 w-5" />
            Goals
          </NavLink>
          <NavLink
            to="/main/analytics"
            className={({ isActive }) => (isActive ? "nav-active" : "nav")}
          >
            Analytics
          </NavLink>
        </div>
        <NavLink className="nav">
          {/* <FaSignOutAlt/> */}
          Log out
        </NavLink>
      </div>
    </div>
  );
};

export default SidebarMobile;
