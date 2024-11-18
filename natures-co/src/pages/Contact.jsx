import React, { Fragment, useRef } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import FloatingChat from "../components/layout/FloatingChat";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaMapMarkerAlt,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Contact = () => {
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Tampilkan notifikasi SweetAlert2
    Swal.fire({
      title: "Success!",
      text: "Your message has been sent successfully.",
      icon: "success",
      confirmButtonText: "OK",
    });

    // Reset form setelah submit
    formRef.current.reset();
  };

  return (
    <Fragment>
      <Header />
      <div className="min-h-screen bg-3 flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Form Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Your Message</label>
                  <textarea
                    name="message"
                    placeholder="Message"
                    className="textarea textarea-bordered w-full h-24"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn bg-1 w-full text-white hover:bg-3"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Get In Touch</h2>
              <p className="text-gray-600 mb-6">
                Tim kami dengan senang hati siap membantu Anda memilih produk
                yang paling sesuai dengan kebutuhan dan keinginan Anda.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-6">
                    <FaPhoneAlt />
                  </span>
                  <div>
                    <p className="font-semibold">Call Us</p>
                    <p>+62 8211 5675 6789</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-6">
                    <FaEnvelope />
                  </span>
                  <div>
                    <p className="font-semibold">Email Us</p>
                    <p>naturesCo@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-6">
                    <FaGlobe />
                  </span>
                  <div>
                    <p className="font-semibold">Website</p>
                    <p>www.naturesCo.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-6">
                    <FaMapMarkerAlt />
                  </span>
                  <div>
                    <p className="font-semibold">Address</p>
                    <p>Jl. Merdeka No. 123, Bandung, Jawa Barat 40123</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex space-x-4">
                <a href="#" className="text-6">
                  <FaTwitter />
                </a>
                <a href="#" className="text-6">
                  <FaFacebook />
                </a>
                <a href="#" className="text-6">
                  <FaInstagram />
                </a>
                <a href="#" className="text-6">
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <FloatingChat />
    </Fragment>
  );
};

export default Contact;
