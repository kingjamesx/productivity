import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Todos from "./Todos";
import Popup from "./Popup";
const Dashboard = () => {
  const [popup, setPopup] = useState(false);

  const popupHandler = (data) => {
    setPopup(data);
    console.log(data);
  };

  const closePopupHandler = (data) => {
    setPopup(data);
  };

  return (
    <section className="flex relative ">
      {popup && <Popup onClosePopup={closePopupHandler} />}
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="w-5/6 pt-7 pl-8 pr-14 overflow-y-auto h-screen">
        <Todos onPopup={popupHandler} />
      </div>
    </section>
  );
};

export default Dashboard;
