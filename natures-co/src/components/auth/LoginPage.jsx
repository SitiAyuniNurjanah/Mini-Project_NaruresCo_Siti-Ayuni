import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import supabase from "../../services/supabaseClient";
import gambar1 from "../../assets/images/gambar12.png";
import gambar2 from "../../assets/images/gambar11.png";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import ikon mata

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State untuk toggle password visibility
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo =
    new URLSearchParams(location.search).get("redirect") || "/";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage("Invalid email or password. Please try again.");
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        const { data: user, error: userError } = await supabase
          .from("users")
          .select("role")
          .eq("guid", session.user.id)
          .single();

        if (userError || !user) {
          setErrorMessage("Unable to fetch user role. Please contact support.");
          return;
        }

        const { role } = user;
        if (role === "admin") {
          navigate("/admin");
        } else if (role === "user") {
          navigate(redirectTo); // Kembali ke halaman sebelumnya
        } else {
          setErrorMessage("Unknown role. Please contact support.");
        }
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex h-screen bg-[#f7f7f7] items-center justify-center">
      {/* Left Image */}
      <div className="hidden md:flex w-1/4 h-full items-center justify-start">
        <img
          src={gambar1}
          alt="Left Illustration"
          className="max-w-[130%] h-auto object-left"
        />
      </div>

      {/* Login Form */}
      <div className="flex flex-col justify-center items-center h-[450px] md:w-1/3 bg-white p-8 shadow-lg rounded-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-2 text-center text-gray-800">
          Login
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Hei, masukkan detail Anda untuk masuk ke akun Anda
        </p>
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}
        <form className="w-full max-w-sm" onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="email@gmail.com"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"} // Toggle antara text dan password
              id="password"
              placeholder="Enter your password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer mt-4 text-gray-200"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-6 hover:bg-5 text-white hover:text-1 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign in
          </button>
        </form>
        <a
          href="/register"
          className="block text-gray-500 text-sm font-medium mt-3"
        >
          Belum punya akun?{" "}
          <span className="text-blue-500 text-sm font-medium mt-3">Daftar</span>{" "}
        </a>
      </div>

      {/* Right Image */}
      <div className="hidden md:flex w-1/4 h-full items-center justify-end">
        <img
          src={gambar2}
          alt="Right Illustration"
          className="max-w-[140%] h-auto object-right"
        />
      </div>
    </div>
  );
};

export default LoginPage;
