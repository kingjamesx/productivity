import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";

const Modal = (props) => {
  const ctx = useContext(AuthContext);

  const closeModalHandler = () => {
    ctx.popupHandler(false);
  };
//   top-0 left-0  z-[1000]
  return (
    <div
      onClick={closeModalHandler}
      className="fixed top-0 left-0  flex justify-center items-center w-screen h-screen bg-[#0000000F] backdrop-blur-sm"
    >
      <div className="flex items-center justify-center w-screen h-screen">
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
