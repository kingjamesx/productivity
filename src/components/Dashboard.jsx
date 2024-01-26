import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Todos from "./Todos";
import Popup from "./Popup";
import AuthContext from "../../store/auth-context";

const Dashboard = () => {
  const ctx = useContext(AuthContext);

  const updateTodoHandler = () => {};

  return (
    <section className="flex relative w-screen ">
      {/* {ctx.popup && <Popup />} */}
      {/* {ctx.popup && <Popup onClosePopup={closePopupHandler} />} */}
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="w-5/6 pt-7 pl-8 pr-14 overflow-y-auto h-screen">
        <Outlet />
        {/* <Todos onPopup={popupHandler} /> */}
      </div>
    </section>
  );
};

export default Dashboard;
