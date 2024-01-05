import React from "react";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Todos from "./Todos";
const Dashboard = () => {
  return (
    <section className="flex ">
      <div className="w-1/5">
        <Sidebar />
      </div>
      <div className="w-4/5 pt-7 pl-8 pr-14">
        <Todos />
      </div>
    </section>
  );
};

export default Dashboard;
