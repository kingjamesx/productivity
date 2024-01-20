import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";

const Modal = (props) => {
  const ctx = useContext(AuthContext);

  const closeModalHandler = () => {
    ctx.popupHandler(false);
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
