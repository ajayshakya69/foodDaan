
import React from "react";



import ProfilePage from "./Profile,";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";





export default function Dashboard() {



  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      {/* Use Navbar component */}
      <Navbar />

      <main className="flex-1 overflow-y-auto p-4 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}




