import React, { useState } from "react";

const AuthContext = React.createContext({
  popup: false,
  popupHandler: () => {},
  edit: false,
  editHandler: () => {},
  inProgress: false,
  inProgressHandler: () => {},
});

export const AuthContextProvider = (props) => {
  const [popup, setPopup] = useState(false);
  const [edit, setEdit] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  const popupHandler = (data) => {
    setPopup(data);
  };
  const editHandler = (data) => {
    setEdit(data);
  };
  const inProgressHandler = (data) => {
    setInProgress(data);
  };

  return (
    <AuthContext.Provider
      value={{
        popupHandler,
        popup,
        edit,
        editHandler,
        inProgress,
        inProgressHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
