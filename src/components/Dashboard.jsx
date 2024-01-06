import React from "react";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Todos from "./Todos";
import Popup from "./Popup";
const Dashboard = () => {
  return (
    <section className="flex relative ">
      <Popup />
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="w-5/6 pt-7 pl-8 pr-14 overflow-y-auto h-screen">
        <Todos />
      </div>
    </section>
  );
};

export default Dashboard;
