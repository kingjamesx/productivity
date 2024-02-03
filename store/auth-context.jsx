import React, { useState } from "react";

const AuthContext = React.createContext({
  popup: false,
  popupHandler: () => {},
  edit: false,
  editHandler: () => {},
});

export const AuthContextProvider = (props) => {
  const [popup, setPopup] = useState(false);
  const [edit, setEdit] = useState(false);

  const popupHandler = (data) => {
    setPopup(data);
  };
  const editHandler = (data) => {
    setEdit(data);
  };

  return (
    <AuthContext.Provider value={{ popupHandler, popup, edit, editHandler }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
