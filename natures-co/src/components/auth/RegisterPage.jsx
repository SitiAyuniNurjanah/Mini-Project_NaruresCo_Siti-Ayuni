import React, { useState } from "react";
import gambar1 from "../../assets/images/gambar12.png";
import gambar2 from "../../assets/images/gambar11.png";
import { useNavigate } from "react-router-dom";
import supabase from "../../services/supabaseClient";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import ikon mata

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State untuk toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State untuk toggle confirm password visibility
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      const { error: userInsertError } = await supabase.from("users").insert([
        {
          guid: data.user.id,
          name,
          email,
          role: "user",
        },
      ]);

      if (userInsertError) {
        setErrorMessage("Failed to save additional user data.");
        return;
      }

      setSuccessMessage("Registration successful! Please verify your email.");
      setErrorMessage("");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      console.error("Unexpected error:", err);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex h-[650px] bg-[#f7f7f7] items-center justify-center">
      {/* Left Image */}
      <div className="hidden md:flex w-1/4 h-full items-center justify-start">
        <img
          src={gambar1}
          alt="Left Illustration"
          className="max-w-[130%] h-auto object-left"
        />
      </div>

      {/* Register Form */}
      <div className="flex flex-col justify-center items-center h-[600px] md:w-1/3 bg-white p-8 shadow-lg rounded-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-2 text-center text-gray-800">
          Register
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Buat akun Anda untuk mulai menggunakan aplikasi
        </p>
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-green-500 text-center mb-4">
            {successMessage}
          </div>
        )}
        <form className="w-full max-w-sm" onSubmit={handleRegister}>
          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="mb-4 relative">
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"} // Toggle antara text dan password
              id="confirm-password"
              placeholder="Confirm your password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer mt-4 text-gray-200"
            >
              {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-6 hover:bg-5 text-white hover:text-1 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
          <a
            href="/login"
            className="block text-gray-500 text-sm font-medium mt-3 mb-3"
          >
            Sudah punya akun?{" "}
            <span className="text-blue-500 text-sm font-medium">Login</span>
          </a>
        </form>
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

export default RegisterPage;
