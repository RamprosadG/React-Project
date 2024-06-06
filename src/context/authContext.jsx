import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [showToast, setShowToast] = useState("");

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userInfo,
        setUserInfo,
        showToast,
        setShowToast,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
