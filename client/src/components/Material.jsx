import React from "react";
import { NavbarDemo } from "./Navbar";
import { SidebarDemo } from "./Sidebar";
import Dashboard from "./Dashboard";

const Material = () => {
  return (
    <div className="w-screen h-screen text-neutral-800 dark:bg-neutral-800 dark:text-white">
      <Dashboard />
    </div>
  );
};

export default Material;
