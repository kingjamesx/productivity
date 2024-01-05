import React from "react";

const Sidebar = () => {
  return (
    <div className="text-lg pl-11 pt-8 pb-[50px] flex flex-col justify-between h-screen shadow-[7px_-1px_12px_0_rgba(0,0,0,0.11)]">
      <div className="flex flex-col gap-9">
        <div className="">Home</div>
        <div className="">To-dos</div>
        <div className="">Goals</div>
        <div className="">Analytics</div>
      </div>
      <div className="">Log out</div>
    </div>
  );
};

export default Sidebar;
