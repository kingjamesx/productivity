import React, { useState } from "react";

const AuthContext = React.createContext({
  popup: false,
  popupHandler: () => {},
});

export const AuthContextProvider = (props) => {
  const [popup, setPopup] = useState(false);

  const popupHandler = (data) => {
    setPopup(data);
  };

  return (
    <AuthContext.Provider value={{ popupHandler, popup }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
