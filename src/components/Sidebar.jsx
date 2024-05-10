import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../../utils/Firebase";
import {toast} from "react-toastify"

// className={isActive =>
//     "" + (!isActive ? " " : "nav-active")}

const Sidebar = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);

  const logoutHandler = async() => {
    try {
      await signOut(auth)
      sessionStorage.removeItem("uid")
      navigate('/')
      toast.success("Bye! Go smash those tasks.")

    } catch (error) {
      console.log(error)
      toast.error(error.code);
    }
    // signOut(auth)
    //   .then(() => {
    //     // Sign-out successful.
    //   })
    //   .catch((error) => {
    //     // An error happened.
    //   });
  };
  return (
    <div className="text-lg  pt-8 pb-[50px] flex flex-col justify-between h-screen shadow-[7px_-1px_12px_0_rgba(0,0,0,0.11)]">
        <div className="pl-11 font-bold text-xl flex items-center gap-1">
          <div className="w-5 h-5 bg-blue-500 rounded-bl-[7px] rounded-tr-[4px]"></div>
          PunchGoal</div>
      <div className="flex flex-col gap-9">
        <NavLink
          to="/main/home"
          className={({ isActive }) => (isActive ? "nav-active" : "nav")}
        >
          {/* <FaHome /> */}
          {/* <img src={home} alt="Home Icon" className="h-5 w-5" /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81zM12 3L2 12h3v8h6v-6h2v6h6v-8h3"
            />
          </svg>
          Home
        </NavLink>
        <NavLink
          to="/main/to-dos"
          className={({ isActive }) => (isActive ? "nav-active" : "nav")}
        >
          {/* <img src={todo} alt="Todo Icon" className="h-5 w-5" /> */}
          {/* <FaTasks/> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19 19H5V8h14m0-5h-1V1h-2v2H8V1H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-2.47 8.06L15.47 10l-4.88 4.88l-2.12-2.12l-1.06 1.06L10.59 17z"
            />
          </svg>
          To-dos
        </NavLink>
        <NavLink
          to="/main/goals"
          // style={{ display: "flex" }}
          className={({ isActive }) => (isActive ? "nav-active" : "nav")}
        >
          {/* <img src={star} alt="Goal Icon" className="h-5 w-5" /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10c0-1.16-.21-2.31-.61-3.39l-1.6 1.6c.14.59.21 1.19.21 1.79a8 8 0 0 1-8 8a8 8 0 0 1-8-8a8 8 0 0 1 8-8c.6 0 1.2.07 1.79.21L15.4 2.6C14.31 2.21 13.16 2 12 2m7 0l-4 4v1.5l-2.55 2.55C12.3 10 12.15 10 12 10a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2c0-.15 0-.3-.05-.45L16.5 9H18l4-4h-3zm-7 4a6 6 0 0 0-6 6a6 6 0 0 0 6 6a6 6 0 0 0 6-6h-2a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4z"
            />
          </svg>
          Goals
        </NavLink>
        <NavLink
          to="/main/analytics"
          className={({ isActive }) => (isActive ? "nav-active" : "nav")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
          >
            <path fill="#000" d="M3 22V8h4v14zm7 0V2h4v20zm7 0v-8h4v8z" />
          </svg>
          Analytics
        </NavLink>
      </div>
      <NavLink onClick={logoutHandler} className="nav">
        {/* <FaSignOutAlt/> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5M4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"
          />
        </svg>
        Log out
      </NavLink>
    </div>
  );
};

export default Sidebar;
