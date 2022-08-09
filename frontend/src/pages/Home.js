import React, { useEffect } from "react";
import Drawer from "../components/Drawer.tsx";
import QuickSearch from "../components/QuickSearch";
import { useAuthContext } from "../contexts/AuthContext";

export default function Home() {
  const { currentUser, isAdmin } = useAuthContext();

  useEffect(() => localStorage.removeItem("search"));

  const home_html = (
    <>
      <div className="home_body">
        {!currentUser && (
          <h1 className="home_title">
            YOUR NEW <span className="welcome_logo">FuRiend </span>IS WAITING
          </h1>
        )}
        {currentUser && !isAdmin && <h1 className="home_title">User Portal</h1>}
        {currentUser && isAdmin && <h1 className="home_title">Admin Portal</h1>}
        <div className="basic_search_wrapper">
          <QuickSearch />
        </div>
      </div>
    </>
  );

  return (
    <div className="home-wrapper">
      <div className="home-inner-wrapper">
        <Drawer home_html={home_html} />
      </div>
    </div>
  );
}
