// SuccessPage.jsx
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function SuccessPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="bg-white rounded-2xl p-12 shadow-lg text-center max-w-md">
        <div className="flex justify-center items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <FaCheckCircle className="text-green-500 text-6xl" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Success!</h1>
        <p className="mt-4 text-gray-600">
          Your checkout was completed successfully. Thank you for your purchase
          and trust!
        </p>
        <Link to="/">
          <button className="mt-8 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
          Back To Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SuccessPage;
