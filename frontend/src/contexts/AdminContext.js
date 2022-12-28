import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../contexts/AuthContext";

const AdminContext = React.createContext();

export function useAdminContext() {
  return useContext(AdminContext);
}

export function AdminContextProvider({ children }) {
  const [ownerships, setOwnerships] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const { isAdmin } = useAuthContext();

  const getAllOwnerships = async () => {
    try {
      const token = localStorage.getItem("token");
      const headersConfig = { headers: { Authorization: "Bearer " + token } };
      const response = await axios.get(
        "http://localhost:3080/pet/adopt",
        headersConfig
      );
      setOwnerships(response.data);
    } catch (err) {
      return { error: err };
    }
  };

  const getAllUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const headersConfig = { headers: { Authorization: "Bearer " + token } };
      const response = await axios.get(
        "http://localhost:3080/user",
        headersConfig
      );
      setAllUsers(response.data);
    } catch (err) {
      return { error: err };
    }
  };

  const approveRequest = async (ownership) => {
    try {
      const token = localStorage.getItem("token");
      const headersConfig = { headers: { Authorization: "Bearer " + token } };
      const response = await axios.put(
        `http://localhost:3080/pet/${ownership.petId}/adopt`,
        { status: "Approved" },
        headersConfig
      );
      response && alert(response.data);
      return response;
    } catch (err) {
      return { error: err };
    }
  };

  const rejectOwnershipRequest = async (ownership) => {
    try {
      const token = localStorage.getItem("token");
      const headersConfig = { headers: { Authorization: "Bearer " + token } };
      const response = await axios.put(
        `http://localhost:3080/pet/${ownership.petId}/adopt`,
        { status: "Rejected" },
        headersConfig
      );
      return response;
    } catch (err) {
      return { error: err };
    }
  };

  const confirmReturn = async (ownership) => {
    try {
      const token = localStorage.getItem("token");
      const headersConfig = { headers: { Authorization: "Bearer " + token } };
      const response = await axios.put(
        `http://localhost:3080/pet/${ownership.petId}/adopt`,
        { status: "Returned" },
        headersConfig
      );
      return response;
    } catch (err) {
      return { error: err };
    }
  };

  const getFullUserInfo = async (user) => {
    try {
      const token = localStorage.getItem("token");
      const headersConfig = { headers: { Authorization: "Bearer " + token } };
      const response = await axios.get(
        `http://localhost:3080/user/${user._id}/full`,
        headersConfig
      );
      return response.data;
    } catch (err) {
      return { error: err };
    }
  };

  return (
    <AdminContext.Provider
      value={{
        getAllOwnerships,
        ownerships,
        setOwnerships,
        allUsers,
        getAllUsers,
        approveRequest,
        rejectOwnershipRequest,
        confirmReturn,
        getFullUserInfo,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
