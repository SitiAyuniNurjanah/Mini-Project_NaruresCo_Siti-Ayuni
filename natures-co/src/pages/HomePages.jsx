import React, { Fragment } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import FloatingChat from "../components/layout/FloatingChat";
import gambar1 from "../assets/images/gambar2.jpg";
import gambar2 from "../assets/images/gambar3.jpg";
import gambar3 from "../assets/images/gambar4.jpg";
import gambar4 from "../assets/images/gambar1.jpg";
import { Link } from "react-router-dom";

const HomePages = () => {
  return (
    <Fragment>
      <Header />
      <div className="bg-1 h-[500px] flex items-center justify-start w-full">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 p-8 mx-auto">
          {/* tulisan sebelah kiri */}
          <div className="md:col-span-3 flex items-center">
            <div className="text-white text-lg w-full">
              <h2 className="text-5xl font-bold mb-2 text-white">
                Nature`s Choice Collection
              </h2>
              <p className="mt-5 text-white">
                Nature`s Choice Collection menawarkan produk ramah lingkungan
                yang dirancang untuk mendukung gaya hidup berkelanjutan tanpa
                mengorbankan kualitas. Temukan pilihan terbaik untuk Anda dan
                bumi.
              </p>
              <Link
                to="/catalog"
                className="btn btn-active bg-white text-neutral rounded-full px-6 py-2 w-80 mt-5 hover:text-neutral hover:bg-2"
              >
                Lihat Katalog
              </Link>
            </div>
          </div>

          {/* gambar */}
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-4 ml-128">
            <div className="md:col-span-1">
              <img
                src={gambar4}
                alt="New Image"
                className="h-[450px] w-full object-cover rounded-md"
              />
            </div>
            <div className="md:col-span-1">
              <img
                src={gambar1}
                alt="Reusable Bamboo Set"
                className="h-[450px] w-full object-cover rounded-md"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-md">
                <img
                  src={gambar2}
                  alt="Reusable Bamboo Set"
                  className="h-[216px] w-full object-cover rounded-md"
                />
              </div>
              <div className="rounded-md">
                <img
                  src={gambar3}
                  alt="Reusable Bamboo Set"
                  className="h-[216px] w-full object-cover rounded-md"
                />
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

export default HomePages;
