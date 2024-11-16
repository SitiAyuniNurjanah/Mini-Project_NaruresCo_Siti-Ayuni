import React from "react";
import { Link } from "react-router-dom";
import { IoMdCart } from "react-icons/io";
import { FaUser } from "react-icons/fa";

const Header = () => {
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
          <a href="/about" className="btn btn-ghost text-1 font-medium text-taupe">
            About
          </a>
          <a href="/daily-tips" className="btn btn-ghost text-1 font-medium text-taupe">
            Eco Tips
          </a>
          <a href="/contact" className="btn btn-ghost text-1 font-medium text-taupe">
            Contact
          </a>
        </div>

        {/* Icon Keranjang dan User di kanan */}
        <div className="flex space-x-4 items-center gap-4">
          {/* Keranjang */}
          <Link to='/cart'>
          <IoMdCart className="text-1 w-7 h-7"/>
          </Link>

          {/* User */}
          <Link to='/login'>
          <FaUser className="text-1 w-6 h-6" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
