import React from "react";
import Drawer from "../components/Drawer.tsx";
import PetsTable from "../components/PetsTable";
import RequestTable from "../components/RequestTableAdmin";
import UsersTable from "../components/UsersTable";

export default function Dashboard() {
  const dashboard_html = (
    <div className="dashboard_inner_wrapper">
      <h2 className="dashboard_title">Admin Central Station</h2>
      <div className="table_title">Users Table</div>
      <UsersTable />
      <div className="table_title">Pets Table</div>
      <PetsTable />
      <div className="table_title_requests">Requests Table</div>
      <RequestTable />
    </div>
  );

  return (
    <div className="dashboard_wrapper">
      <div className="dashboard_inner_wrapper">
        <Drawer dashboard_html={dashboard_html} />
      </div>
    </div>
  );
}
