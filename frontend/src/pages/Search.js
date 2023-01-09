import React from "react";
import Drawer from "../components/Drawer.tsx";
import Card from "../components/Card";
import { usePetContext } from "../contexts/PetContext";
import { useModalContext } from "../contexts/ModalContext";
import QuickSearch from "../components/QuickSearch";
import { Button } from "@mui/material";
import AdvancedSearch from "../components/AdvancedSearch";
import { useWindowSize } from "../hooks/windowSize";

export default function Search() {
  const { petData } = usePetContext();
  const { handleAdvancedSearchOpen } = useModalContext();

  const windowSize = useWindowSize();

  const search_html = (
    <>
      <div className="search_wrapper">
        <div className="search_page_bar">
          <QuickSearch />
          <div className="advanced_search">
            <Button onClick={handleAdvancedSearchOpen}>Advanced Search</Button>
            <AdvancedSearch />
          </div>
        </div>
        {petData.length > 0 && (
          <div className="pets_search_title">Our Pets</div>
        )}
        {petData.length === 0 && (
          <div className="pets_search_title_empty">Make yourself a </div>
        )}
        {petData.length === 0 && (
          <h1 className="welcome_banner search_logo"> Furiend</h1>
        )}
        <div className="card_grid">
          {petData.map((pet, index) => {
            return (
              <div className="card" key={index}>
                <Card pet={pet} key={index} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );

  return (
    <>
      <Drawer search_html={search_html} />
    </>
  );
}
