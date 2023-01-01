import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = React.createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));

  const signUp = async (new_user) => {
    try {
      const user = await axios.post("/auth/signup", new_user);
      return user;
    } catch (err) {
      return { error: err };
    }
  };

  const login = async (user) => {
    try {
      const existing_user = await axios.post("/auth/login", user);
      if (existing_user) {
        localStorage.setItem("token", existing_user.data.token);
        localStorage.setItem("user", JSON.stringify(existing_user.data));
        setCurrentUser(existing_user.data);
        if (existing_user.data.isAdmin) {
          setIsAdmin(true);
          localStorage.setItem("isAdmin", true);
        }
      }
    } catch (err) {
      return { error: err };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");
    setCurrentUser("");
    window.location.pathname = "/";
  };

  const resetPassword = async (user) => {
    try {
      const response = await axios.post("/forgot_password/get_link", {
        email: user,
      });
      return response;
    } catch (err) {
      return { error: err };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        login,
        logout,
        currentUser,
        setCurrentUser,
        isAdmin,
        setIsAdmin,
        resetPassword,
      }}
    >
      {" "}
      {children}
    </AuthContext.Provider>
  );
}
