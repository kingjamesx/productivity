import React from "react";
import { FormatDate } from "../hooks/FormatDate";

const TaskDoneCard = (props) => {
  const { year, month, date } = FormatDate(props.todo.date_done, true);
  const date_completed = `${month} ${date}, ${year}`

  const shortenDescription = (text) => {
    if (text.length > 24) {
      return text.slice(0, 24) + "....";
    } else {
      return text;
    }
  };

  return (
    <div className="group bg-white rounded-lg p-3 mb-4">
      {/* {ctx.edit && <Popup  />} */}
      <div className="pb-2">
        <div
          // w-max px-1.5 py-1 bg-opacity-15  bg-[#83C29D]
          className={"rounded-[4px] text-sm text-[#68B266] "}
        >
          Completed: {date_completed}
        </div>
      </div>
      {/* content */}
      <div className="flex justify-between items-center">
        <h3 className="text-base line-through">{props.todo.todo}</h3>
      </div>
    </div>
  );
};

export default TaskDoneCard;
