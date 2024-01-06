import React, { useState } from "react";
import close from "../assets/icons/close.svg";

const Popup = () => {
  const [popup, setPopup] = useState(false);

  const closePopupHandler = () => {
    setPopup(false)
  };
  return (
    <div className="absolute z-[100] flex justify-center items-center w-screen h-screen bg-[#0000000F] backdrop-blur-sm">
      <div className="bg-white rounded-lg p-4 pt-2">
        <div className="flex item-center justify-between mb-3">
          <h4 className="font-bold text-lg">Create To-do</h4>
          <img src={close} alt="close icon" onClick={closePopupHandler} />
        </div>

        <div className="flex flex-col w-[400px]">
          <label htmlFor="to-do" className="mb-1">
            To-do
          </label>
          <input
            id="to-do"
            type="text"
            placeholder="Read a book"
            className="p-2 h-8.5 outline-none border rounded-md"
          />
        </div>

        <div className="mt-4 flex flex-col w-[400px]">
          <label htmlFor="description" className="mb-1">
            Description
          </label>
          <input
            id="description"
            type="text"
            placeholder="Read a book"
            className="p-2 h-8.5 outline-none border rounded-md"
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex flex-col w-auto">
            <label htmlFor="date" className="mb-1">
              Due Date
            </label>
            <input
              id="date"
              type="date"
              //   placeholder="2017-06-01"
              className="p-2 h-8.5 outline-none border rounded-md"
            />
          </div>
          <div className="flex flex-col w-auto">
            <label htmlFor="time" className="mb-1">
              Due time
            </label>
            <input
              id="time"
              type="time"
              //   placeholder="2017-06-01"
              className="p-2 h-8.5 outline-none border rounded-md"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-col w-[400px]">
          <label htmlFor="priority" className="mb-1">
            Priority
          </label>
          <select
            id="priority"
            type="text"
            placeholder="Read a book"
            className="p-2 h-8.5 outline-none border rounded-md"
          >
            <option>High</option>
            <option>Low</option>
          </select>
        </div>

        <button className="bg-blue-500 rounded-md h-8.5 mt-5 p-2 text-center w-full">
          Create
        </button>
      </div>
    </div>
  );
};

export default Popup;
