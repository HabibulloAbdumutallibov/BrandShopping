import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserPlus, FaShoppingCart, FaExchangeAlt, FaHeart } from "react-icons/fa";
import Logo from "../assets/logo.png";
import Search from "./search";

function Header() {
  const [searchTerm, setSearchTerm] = useState(""); 

  return (
    <div className="flex flex-wrap items-center justify-between p-4 bg-white">
      <Link to="/" className="hidden sm:flex items-center px-4">
      <svg width="70" height="70" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="75" cy="75" r="70" stroke="gold" stroke-width="3" fill="none"/>
  <text x="50%" y="60%" font-family="'Arial', sans-serif" font-size="20" fill="gold" text-anchor="middle" font-weight="bold">Brand Shop</text>
  <path d="M45 70 L75 30 L105 70" stroke="gold" stroke-width="3" fill="none"/>
  <circle cx="65" cy="70" r="3" fill="gold"/>
  <circle cx="85" cy="70" r="3" fill="gold"/>
</svg>
<text className="text-yellow-300" x="50%" y="60%" font-family="'Arial', sans-serif" font-size="20" fill="gold" text-anchor="middle" font-weight="bold">Brand Shop</text>

      </Link>

      <Link to="/exchange" className="hidden sm:flex bg-gray-200 items-center text-yellow-400 px-4 py-2 rounded-md">
        <FaExchangeAlt className="mr-2" /> Katalog
      </Link>

      <div className="w-full sm:w-1/3 mt-2 sm:mt-0">
        <Search onSearch={setSearchTerm} />
      </div>

      <div className="flex space-x-2 mt-2 sm:mt-0">
        <Link to="/register" className="flex items-center text-yellow-400 px-3 py-2 sm:px-4">
          <FaUserPlus className="mr-1 sm:mr-2" /> <span className="hidden sm:inline">Sign In</span>
        </Link>
        <Link to="/statistika" className="flex items-center text-yellow-400 px-3 py-2 sm:px-4">
          <FaHeart className="mr-1 sm:mr-2" /> <span className="hidden sm:inline">Like</span>
        </Link>
        <Link to="/karzinka" className="flex items-center text-yellow-400 px-3 py-2 sm:px-4">
          <FaShoppingCart className="mr-1 sm:mr-2" /> <span className="hidden sm:inline">Cart</span>
        </Link>
      </div>
    </div>
  );
}

export default Header;
