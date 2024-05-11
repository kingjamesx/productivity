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
    <section className="flex relative w-screen md:h-screen md:overflow-y-auto">
      {/* {openSidebar && <SidebarMobile onClose={sidebarToggleHandler}  />} */}
      {/* {ctx.popup && <Popup />} */}

      {/* {ctx.popup && <Popup onClosePopup={closePopupHandler} />} */}
      <div className="hidden md:block md:w-2/6 lg:w-1/6 ">
        <Sidebar />
      </div>
      <div className="relative md:z-[30000000000000] w-full md:w-5/6 pt-3 md:pt-7 px-4 md:pl-8 md:pr-10 md:overflow-y-auto md:h-screen">
        {/* <Header isOpen={openSidebar} onSidebarToggle={sidebarToggleHandler} /> */}
        <div className="absolute bottom-0 left-0">
          <MobileSidebar />
        </div>
        <Header />
        <Outlet />
        {/* <Todos onPopup={popupHandler} /> */}
      </div>
    </section>
  );
};

export default Dashboard;
