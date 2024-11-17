import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdCart } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import supabase from '../../services/supabaseClient';

const Header = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  useEffect(() => {
    checkUser();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      navigate("/"); 
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-2 p-4">
      <div className="container mx-auto h-[30px] flex items-center justify-between">
        {/* Logo di kiri */}
        <div className="flex items-center">
          <a href="/" className="text-2xl text-1 font-bold">
            Nature`sCo
          </a>
        </div>

        {/* Menu di tengah */}
        <div className="flex space-x-2 items-center justify-center">
          <a href="/" className="btn btn-ghost text-1 font-medium text-taupe">
            Home
          </a>
          <a
            href="/about"
            className="btn btn-ghost text-1 font-medium text-taupe"
          >
            About
          </a>
          <a
            href="/daily-tips"
            className="btn btn-ghost text-1 font-medium text-taupe"
          >
            Eco Tips
          </a>
          <a
            href="/contact"
            className="btn btn-ghost text-1 font-medium text-taupe"
          >
            Contact
          </a>
        </div>

        {/* Icon Keranjang dan User di kanan */}
        <div className="flex space-x-4 items-center gap-4">
          {/* Keranjang */}
          <Link to="/cart">
            <IoMdCart className="text-1 w-7 h-7" />
          </Link>

          {/* User / Login / Logout */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-1 font-medium text-taupe flex items-center"
            >
              <FaUser className="text-1 w-6 h-6 mr-2" />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
