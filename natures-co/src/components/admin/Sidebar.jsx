import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdHome, IoIosCreate } from "react-icons/io";
import { AiFillProduct } from "react-icons/ai";
import { FaTable, FaTableList } from "react-icons/fa6";
import supabase from "../../services/supabaseClient";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Data menu
  const menuItems = [
    { to: "/admin", label: "Dashboard", icon: <IoMdHome size={30} /> },
    { to: "/form", label: "Form Product", icon: <IoIosCreate size={30} /> },
    { to: "/table-product", label: "Product", icon: <FaTable size={30} /> },
    {
      to: "/form-category",
      label: "Form Category",
      icon: <AiFillProduct size={30} />,
    },
    {
      to: "/table-category",
      label: "Category",
      icon: <FaTableList size={30} />,
    },
  ];

  return (
    <div className="h-screen bg-1 flex flex-col justify-between w-64 p-5">
      {/* Logo */}
      <div className="mb-6">
        <div className="flex items-center">
          <p className="text-white ml-2 text-3xl font-bold">Nature`sCo</p>
        </div>
      </div>

      {/* Menu Items */}
      <ul className="space-y-4 p-1 flex-grow">
        {" "}
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link className="flex items-center" to={item.to}>
              <span className="text-white">{item.icon}</span>
              <span className="text-white font-medium ml-2">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Logout Button */}
      <div className="bg-2 p-3 rounded-lg flex justify-center">
        <button
          onClick={handleLogout}
          className="h-3 w-32 flex items-center justify-center text-1 font-bold rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
