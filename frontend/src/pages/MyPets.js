import React from "react";
import { useEffect, useState } from "react";
import Drawer from "../components/Drawer.tsx";
import SavedPetCard from "../components/SavedPetCard";
import OwnedPetCard from "../components/OwnedPetCard";

export default function MyPets() {
  const [savedPets] = useState(JSON.parse(localStorage.getItem("all_pets")));
  useEffect(() => localStorage.removeItem("search"));

  const active_ownerships = savedPets.owned.filter(
    (pet) => pet.status === "Fostered" || pet.status === "Adopted"
  );

  console.log(active_ownerships);

  const my_pets_html = (
    <>
      <div className="my_pets_wrapper">
        <div className="pets_search_title">Saved Pets</div>
        <div className="card_grid">
          {savedPets &&
            savedPets.saved.map((pet, index) => {
              return (
                <div className="saved_card" key={index}>
                  <SavedPetCard pet={pet} key={index} />
                </div>
              );
            })}
        </div>
        {savedPets.saved.length === 0 && (
          <div className="missing_pets">
            Go browse our collection and save potential pets here!{" "}
          </div>
        )}
        <div className="pets_search_title">Owned Pets</div>
        <div className="card_grid">
          {savedPets &&
            savedPets.owned.map((pet, index) => {
              if (pet.status !== "Available") {
                return (
                  <div className="saved_card" key={index}>
                    <OwnedPetCard pet={pet} key={index} />
                  </div>
                );
              }
            })}
        </div>
        {active_ownerships.length === 0 && (
          <div className="missing_pets">Make a request to foster or adopt</div>
        )}
      </div>
    </>
  );

  return (
    <div>
      <Drawer my_pets_html={my_pets_html}> </Drawer>
    </div>
  );
}
