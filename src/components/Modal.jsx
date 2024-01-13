import React, { useState } from "react";

const Modal = (props) => {
  const [modal, setModal] = useState(false);

  const closeModalHandler = () => {
    props.onClose(false)
    setModal(false)
  };
  return (
    <div
      onClick={closeModalHandler}
      className="absolute z-[100] flex justify-center items-center w-screen h-screen bg-[#0000000F] backdrop-blur-sm"
    >
      {props.children}
    </div>
  );
};

export default Modal;
