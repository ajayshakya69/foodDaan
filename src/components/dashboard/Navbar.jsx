import React, { useEffect, useState } from "react";
import { Home, ShoppingBag, UtensilsCrossed, User } from "lucide-react";
import NavItem from "./Navitem";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";


export default function Navbar() {

  const user = useAuth()




  return (
    <nav className="w-full lg:w-64 bg-white bg-opacity-10 p-4">
      <Link to="/" className="username bg-white flex justify-center items-center p-3 rounded-lg mb-7">
        Go Back
      </Link>
      <div className="username bg-white flex justify-center items-center p-3 rounded-lg mb-7">
        <h1 className="m-auto text-lg">Welcome, {user ? user.name : "guest"}</h1>
      </div>
      <div className="flex lg:flex-col space-x-4 lg:space-x-0 lg:space-y-4 dash-nav">
        <NavItem
          icon={<Home className="mr-2" />}
          label="Home"
          to="/dashboard"

        />
        <NavItem
          icon={<ShoppingBag className="mr-2" />}
          label="Food Requests"
          to="food-requests"
        />
        {(!!user && user.role === "donor") && (
          <NavItem
            icon={<UtensilsCrossed className="mr-2" />}
            label="Your Donations"
            to="your-donations"
          />)}
        <NavItem
          icon={<User className="mr-2" />}
          label="Profile"
          to="profile"
        />
      </div>
    </nav>
  );
}
