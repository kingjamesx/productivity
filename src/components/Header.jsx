import React from "react";
import search from "../assets/icons/search.svg";
import notification from "../assets/icons/notification.svg";

const Header = () => {
  return (
    <div className="mb-14 text-base flex items-center justify-between">
      <div className="flex items-center h-12">
        <div className="py-3 pl-3 pr-4 border rounded-tl-md rounded-bl-md border-r-0 h-full">
          <img
            src={search}
            alt="search icon"
            className=""
          />
        </div>
        <input
          className="w-[400px] h-12 py-3 pr-3 bg-transparent outline-none border rounded-tr-md rounded-br-md border-l-0"
          placeholder="Search"
          type="text"
        />
      </div>
      <div className="flex items-center gap-9">
        <img src={notification} alt="notification icon" className="" />
        <div className="flex items-center gap-3">
            <p className="">Hey Hikmot</p>
            <div className="h-8 w-8 rounded-full bg-slate-300"></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
