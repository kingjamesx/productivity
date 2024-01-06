import React from "react";
import deleteIcon from "../assets/icons/delete.svg";
import edit from "../assets/icons/edit.svg";

const TaskCard = () => {
  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex items-center justify-between pb-4">
        <div className="rounded-[4px] px-1.5 py-1 text-[#D8727D] bg-[#D8727D] bg-opacity-15">
          High
        </div>
        <img src={deleteIcon} alt="Delete icon" className="cursor-pointer" />
      </div>
      {/* content */}
      <div className="">
        <h3 className="text-lg pb-3 font-bold">Brainstorming</h3>
        <p className="text-[#787486]">
          Brainstorming brings team members' diverse experience into play.{" "}
        </p>
      </div>

      <div className="flex items-center justify-between mt-5">
        <p className="font-bold">
          Due: <span className="font-normal">Jan 6, 2024</span>
        </p>
        <img src={edit} alt="edit icon" className="cursor-pointer" />
      </div>
    </div>
  );
};

export default TaskCard;
