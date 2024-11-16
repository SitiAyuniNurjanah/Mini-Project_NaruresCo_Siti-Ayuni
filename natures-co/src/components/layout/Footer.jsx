import React from "react";
import {
  FaTwitter,
  FaFacebookF,
  FaPinterest,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-2 text-neutral-content p-10">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4 text-1">Nature`SCo</h1>
        <nav className="flex justify-center space-x-6 mb-4">
          <a href="/" className="text-1">
            HOME
          </a>
          <a href="/about" className="text-1">
            ABOUT
          </a>
        </nav>
        <nav className="flex justify-center space-x-4 mb-4">
          <a href="/daily-tips" className="text-1">
            ECO-TIPS
          </a>
          <a href="/cart" className="text-1">
            CART
          </a>
          <a href="/catalog" className="text-1">
            CATALOG
          </a>
          <a href="/contact" className="text-1">
            CONTACT
          </a>
        </nav>
        <div className="flex justify-center space-x-4 mb-6">
          <a href="#" className="text-1">
            <FaTwitter className="text-xl" />
          </a>
          <a href="#" className="text-1">
            <FaFacebookF className="text-xl" />
          </a>
          <a href="#" className="text-1">
            <FaPinterest className="text-xl" />
          </a>
          <a href="#" className="text-1">
            <FaLinkedinIn className="text-xl" />
          </a>
          <a href="#" className="text-1">
            <FaInstagram className="text-xl" />
          </a>
        </div>

        <div className="text-sm mb-2">
          <a href="#" className="text-1">
            Terms & Conditions
          </a>{" "}
          |{" "}
          <a href="#" className="text-1">
            Privacy Policy
          </a>
        </div>
        <p className="text-sm text-1">
          &copy;2024 naturesco, Ltd. All rights reserved. Site credit.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
