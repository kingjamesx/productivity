import React from "react";
import { NavLink } from "react-router-dom";

// className={isActive =>
//     "" + (!isActive ? " " : "nav-active")}

const Sidebar = () => {
  return (
    <div className="text-lg  pt-8 pb-[50px] flex flex-col justify-between h-screen shadow-[7px_-1px_12px_0_rgba(0,0,0,0.11)]">
      <div className="flex flex-col gap-9">
        <NavLink
          to="/main/home"
          className={({ isActive }) =>
            isActive ? "nav-active" : "nav"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/main/to-dos"
          className={({ isActive }) =>
            isActive ? "nav-active" : "nav"
          }
        >
          To-dos
        </NavLink>
        <NavLink
          to="/main/goals"
          className={({ isActive }) =>
            isActive ? "nav-active" : "nav"
          }
        >
          Goals
        </NavLink>
        <NavLink
          to="/main/analytics"
          className={({ isActive }) =>
            isActive ? "nav-active" : "nav"
          }
        >
          Analytics
        </NavLink>
      </div>
      <NavLink className="nav">Log out</NavLink>
    </div>
  );
};

export default Sidebar;
