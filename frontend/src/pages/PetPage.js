import React, { useMemo } from "react";
import Drawer from "../components/Drawer.tsx";
import { Paper, Button } from "@mui/material";
import OwnershipForm from "../components/OwnershipForm";
import { useModalContext } from "../contexts/ModalContext";
import { useAuthContext } from "../contexts/AuthContext";

export default function PetPage() {
  let activeCard = {};

  const { handleOwnershipRequestOpen } = useModalContext();

  const { currentUser } = useAuthContext();

  useMemo(() => {
    activeCard = JSON.parse(localStorage.getItem("activeCard"));
  });

  const petPage_html = (
    <>
      <div className="pet_page_wrapper">
        <div className="pet_page_top">
          <div className="pet_page_image">
            <img
              src={`${activeCard.img}`}
              alt="pet image"
            />
          </div>
          <div className="pet_page_top_right">
            <div className="pet_page_title">
              <h2>Meet {activeCard.name}!</h2>
            </div>
            <div className="pet_page_status">
              {activeCard.status}
              {activeCard.status === "Available" && currentUser && (
                <div>
                  <Button
                    onClick={() => handleOwnershipRequestOpen()}
                    variant="contained"
                  >
                    Request To Own
                  </Button>
                </div>
              )}
              <OwnershipForm pet={activeCard} />
            </div>
          </div>
        </div>

        <div className="pet_page_bottom">
          <div className="pet_page_bottom_left">
            <div className="pet_page_stats">
              <Paper sx={{ padding: 2 }} elevation={3}>
                <h2>{activeCard.name} Stats</h2>
                <ul>
                  <li>Height: {activeCard.height}cm</li>
                  <li>Weight: {activeCard.weight}kg</li>
                  <li>Color: {activeCard.color}</li>
                </ul>
              </Paper>
            </div>
          </div>
          <div className="pet_page_bottom_right">
            <div className="pet_page_bio">
              <Paper sx={{ padding: 2 }} elevation={3}>
                <h2>Bio</h2>
                <div>{activeCard.bio}</div>
              </Paper>
            </div>
            <div className="pet_page_health">
              <Paper sx={{ padding: 2 }} elevation={3}>
                <h2>Health Information</h2>
                <div>
                  Dietary Restrictions:{" "}
                  {activeCard.dietary_restrictions || "none"}
                </div>
                <div>
                  Hyperallergenic: {activeCard.hyperallergenic || "Nope!"}
                </div>
              </Paper>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div>
      <Drawer petPage_html={petPage_html} />
    </div>
  );
}
