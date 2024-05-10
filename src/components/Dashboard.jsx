import React, { useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import SidebarMobile from "./SidebarMobile";
import Todos from "./Todos";
import Popup from "./Popup";
import AuthContext from "../../store/auth-context";
import Header from "./Header";
import MobileSidebar from "./MobileSidebar";

const Dashboard = () => {
  const ctx = useContext(AuthContext);
  const [openSidebar, setOpenSidebar] = useState(false);

  const sidebarToggleHandler = (val) => {
    setOpenSidebar(val);
  };

  // const updateTodoHandler = () => {};

  return (
    <section className="flex relative w-screen ">
      {/* {openSidebar && <SidebarMobile onClose={sidebarToggleHandler}  />} */}
      <MobileSidebar/>
      {/* {ctx.popup && <Popup />} */}
      {/* {ctx.popup && <Popup onClosePopup={closePopupHandler} />} */}
      <div className="hidden md:block md:w-2/6 lg:w-1/6 ">
        <Sidebar />
      </div>
      <div className="z-[30000000000000] w-full md:w-5/6 pt-3 md:pt-7 px-4 md:pl-8 md:pr-10 overflow-y-auto h-screen">
      {/* <Header isOpen={openSidebar} onSidebarToggle={sidebarToggleHandler} /> */}
      <Header/>
        <Outlet />
        {/* <Todos onPopup={popupHandler} /> */}
      </div>
    </section>
  );
};

export default Dashboard;
