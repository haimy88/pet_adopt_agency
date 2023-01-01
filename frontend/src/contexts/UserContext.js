import React from "react";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../contexts/AuthContext";

const UserContext = React.createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserContextProvider({ children }) {
  const [savedPets, setSavedPets] = useState(
    JSON.parse(localStorage.getItem("savedPets"))
  );
  const [userRequests, setUserRequests] = useState(
    JSON.parse(localStorage.getItem("userRequests"))
  );

  const { currentUser, setCurrentUser } = useAuthContext();

  const editUserInfo = async (user) => {
    try {
      const token = localStorage.getItem("token");
      const headersConfig = { headers: { Authorization: "Bearer " + token } };
      const response = await axios.put(`/user/${user.id}`, user, headersConfig);
      localStorage.setItem("user", JSON.stringify(response.data));
      setCurrentUser(response.data);
      return response;
    } catch (err) {
      return { error: err };
    }
  };

  const savePet = async (pet) => {
    try {
      const token = localStorage.getItem("token");
      const headersConfig = { headers: { Authorization: "Bearer " + token } };
      const res = await axios.post(`/pet/${pet._id}/save`, pet, headersConfig);
      getAllOwnedAndSavedPets();
      return res;
    } catch (err) {
      return { error: err };
    }
  };

  const getAllOwnedAndSavedPets = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      const headersConfig = { headers: { Authorization: "Bearer " + token } };
      const res = await axios.get(`/pet/user/${user.id}/`, headersConfig);
      setSavedPets(res.data);
      localStorage.setItem("all_pets", JSON.stringify(res.data));
      return res;
    } catch (err) {
      return { error: err };
    }
  };

  const removeSavedPet = async (pet) => {
    try {
      const token = localStorage.getItem("token");
      const headersConfig = { headers: { Authorization: "Bearer " + token } };
      const res = await axios.delete(`/pet/${pet._id}/save`, headersConfig);
      setTimeout(() => window.location.reload(true), 1200);
      return res;
    } catch (err) {
      return { error: err };
    }
  };

  const getOwnershipDetails = async (petId) => {
    try {
      const token = localStorage.getItem("token");
      const headersConfig = { headers: { Authorization: "Bearer " + token } };
      const res = await axios.get(`/pet/${petId}/adopt`, headersConfig);
      return res;
    } catch (err) {
      return { error: err };
    }
  };

  const sendOwnershipRequest = async (request) => {
    try {
      const token = localStorage.getItem("token");
      const headersConfig = { headers: { Authorization: "Bearer " + token } };
      const res = await axios.post(
        `/pet/${request.petId}/adopt`,
        request,
        headersConfig
      );
      return res.data;
    } catch (err) {
      return { error: err };
    }
  };

  const getAllRequests = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const headersConfig = { headers: { Authorization: "Bearer " + token } };
      const res = await axios.get(`/user/${id}/requests`, headersConfig);
      setUserRequests(res.data);
      localStorage.setItem("userRequests", JSON.stringify(res.data));
      return res;
    } catch (err) {
      return { error: err };
    }
  };

  const declareReturnPet = async (ownership) => {
    try {
      const token = localStorage.getItem("token");
      const headersConfig = { headers: { Authorization: "Bearer " + token } };
      const response = await axios.put(
        `/pet/${ownership.petId}/adopt`,
        { status: "Return Pending" },
        headersConfig
      );
      return response.data;
    } catch (err) {
      return { error: err };
    }
  };

  useEffect(() => {
    if (currentUser) {
      getAllOwnedAndSavedPets();
      getAllRequests(currentUser.id);
    }
  }, [currentUser]);

  return (
    <UserContext.Provider
      value={{
        savePet,
        getAllOwnedAndSavedPets,
        savedPets,
        removeSavedPet,
        getOwnershipDetails,
        sendOwnershipRequest,
        declareReturnPet,
        editUserInfo,
        setSavedPets,
        getAllRequests,
        userRequests,
      }}
    >
      {" "}
      {children}{" "}
    </UserContext.Provider>
  );
}
