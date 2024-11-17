import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdHome, IoIosCreate } from "react-icons/io";
import { AiFillProduct } from "react-icons/ai";
import supabase from "../../services/supabaseClient";

const Sidebar = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setAdmin(null);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <div className="h-screen bg-1 flex flex-col justify-between w-64 p-5">
      {/* Logo */}
      <div>
        <div className="flex items-center mb-10">
          <p className="text-white ml-2 text-3xl font-bold">Nature`sCo</p>
        </div>
        {/* Menu Items */}
        <ul className="space-y-6 p-2">
          <Link className="flex items-center" to="/admin">
            <IoMdHome className="text-white" size={30} />
            <span className="text-white font-medium ml-2">Dashboard</span>{" "}
          </Link>
          <Link className="flex items-center" to="/form">
            <IoIosCreate className="text-white" size={30} />
            <span className="text-white font-medium ml-2">
              Form Product
            </span>{" "}
          </Link>
          <Link className="flex items-center" to="/table-product">
            <AiFillProduct className="text-white" size={30} />
            <span className="text-white font-medium ml-2">Tabel</span>{" "}
          </Link>
        </ul>
      </div>

      <div className="bg-2 p-3 rounded-lg flex justify-center">
        <button onClick={handleLogout} className="h-3 w-32 flex items-center justify-center text-1 font-bold rounded-lg">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
