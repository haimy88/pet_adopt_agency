import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { petsAPI } from "../api/pets";

const PetContext = React.createContext();

export function usePetContext() {
  return useContext(PetContext);
}

export function PetContextProvider({ children }) {
  const [petlib, setPetlib] = useState([]);
  const [petData, setPetData] = useState([]);

  useEffect(() => {
    getAllPets();
  }, []);

  useEffect(() => {
    if (petData) {
      localStorage.setItem("search", JSON.stringify(petData));
    } else {
      localStorage.removeItem("search");
    }
  }, [petData]);

  const getAllPets = async () => {
    try {
      // const res = await axios.get("http://localhost:3080/pet/search");
      const data = await petsAPI();
      // .then((response) => {
      //   setPetlib(response.data);
      // });
      setPetlib(data);
    } catch (err) {
      return { error: err };
    }
  };

  const quickSearchPets = async (word) => {
    try {
      await axios
        .get("http://localhost:3080/pet/search", { params: { general: word } })
        .then((response) => {
          setPetData(response.data);
        });
    } catch (err) {
      return { error: err };
    }
  };

  const advancedSearchPets = async (criteria) => {
    try {
      await axios
        .get("http://localhost:3080/pet/search", { params: criteria })
        .then((response) => {
          setPetData(response.data);
        });
    } catch (err) {
      return { error: err };
    }
  };

  const addPet = async (new_pet) => {
    let formData = new FormData();
    formData.append("name", new_pet.name);
    formData.append("type", new_pet.type);
    formData.append("breed", new_pet.breed);
    formData.append("height", new_pet.height);
    formData.append("weight", new_pet.weight);
    formData.append("color", new_pet.color);
    formData.append("dietary_restrictions", new_pet.dietary_restrictions);
    formData.append("bio", new_pet.bio);
    formData.append("hyperallergenic", new_pet.hyperallergenic);
    formData.append("status", new_pet.status);
    formData.append("img", new_pet.img);

    try {
      const token = localStorage.getItem("token");
      const headersConfig = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      };
      await axios
        .post("http://localhost:3080/admin/add", formData, headersConfig)
        .then((response) => {
          alert(response.data);
        });
      return true;
    } catch (err) {
      return { error: err };
    }
  };

  const editPet = async (new_pet, _id) => {
    let formData = new FormData();
    formData.append("name", new_pet.name);
    formData.append("type", new_pet.type);
    formData.append("breed", new_pet.breed);
    formData.append("height", new_pet.height);
    formData.append("weight", new_pet.weight);
    formData.append("color", new_pet.color);
    formData.append("dietary_restrictions", new_pet.dietary_restrictions);
    formData.append("bio", new_pet.bio);
    formData.append("hyperallergenic", new_pet.hyperallergenic);
    formData.append("status", new_pet.status);
    formData.append("img", new_pet.img);
    formData.append("_id", _id);
    try {
      const token = localStorage.getItem("token");
      const headersConfig = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      await axios
        .put(`http://localhost:3080/admin/pet/${_id}`, new_pet, headersConfig)
        .then((response) => {
          alert(response.data);
        });
      return true;
    } catch (err) {
      return { error: err };
    }
  };

  const deletePet = async (pet) => {
    if (window.confirm("Delete the item?")) {
      try {
        await axios
          .delete(`http://localhost:3080/pet/${pet._id}`)
          .then((response) => {
            alert(response.data);
          });
      } catch (err) {
        return { error: err };
      }
    }
  };

  return (
    <PetContext.Provider
      value={{
        getAllPets,
        petlib,
        setPetlib,
        addPet,
        petData,
        setPetData,
        quickSearchPets,
        advancedSearchPets,
        editPet,
        deletePet,
      }}
    >
      {" "}
      {children}
    </PetContext.Provider>
  );
}
