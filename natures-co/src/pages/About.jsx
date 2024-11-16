import React, { Fragment } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import FloatingChat from "../components/layout/FloatingChat";
import gambar1 from "../assets/images/gambar5.jpg";
import gambar2 from "../assets/images/gambar6.jpg";
import gambar3 from "../assets/images/gambar7.jpg";
import gambar4 from "../assets/images/gambar8.jpg";
import gambar5 from "../assets/images/gambar9.jpg";
import { TbTargetArrow } from "react-icons/tb";
import { BiSolidCheckShield } from "react-icons/bi";
import { PiUsersFourFill } from 'react-icons/pi';


const About = () => {
  return (
    <Fragment>
      <Header />
      <div className="bg-3">
        {/* Header Section */}
        <div className="text-center py-16">
          <h1 className="text-5xl font-bold text-2">About us</h1>
          <p className="mt-4 text-2 max-w-2xl mx-auto">
            Bersama kami, buatlah pilihan bijak untuk mendukung masa depan yang
            lebih hijau melalui produk-produk yang peduli pada alam.
          </p>
        </div>

        {/* Image Section */}
        <div className="relative flex justify-center mb-20">
          <div className="absolute flex gap-4 -top-10">
            <div className="w-52 h-52 bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={gambar1}
                alt="Image 1"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="w-52 h-52 bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={gambar2}
                alt="Image 2"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="w-52 h-52 bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={gambar3}
                alt="Image 3"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="w-52 h-52 bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={gambar4}
                alt="Image 4"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Content Section 1 */}
        <div className="bg-white py-16 h-[350px] px-8">
          <h2 className="text-3xl font-bold text-center mb-8 mt-16">
            Pilihan Bijak untuk Masa Depan yang Lebih Hijau
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <p className="text-gray-600">
              Kami hadir untuk mempermudah Anda memilih produk ramah lingkungan
              yang berkualitas. Dalam katalog ini, kami menyediakan berbagai
              pilihan yang dirancang dengan prinsip keberlanjutan, dari bahan
              alami hingga proses produksi yang minim dampak lingkungan.
            </p>
            <p className="text-gray-600">
              Setiap produk dalam katalog kami dipilih secara cermat, memastikan
              bahwa Anda bisa berbelanja dengan tenang dan tahu bahwa pilihan
              Anda berkontribusi pada bumi yang lebih hijau. Kami ingin mengajak
              Anda bersama-sama menjaga lingkungan melalui langkah sederhana
              yang membawa dampak nyata.
            </p>
          </div>
        </div>

        {/* Image and Quote Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 py-16 px-8 bg-4">
          <div className="w-full md:w-1/2">
            <img
              src={gambar5}
              alt="Founder"
              className="rounded-lg shadow-lg h-[75vh] w-[95vh]"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">
              Kenapa Harus Nature`sCo?
            </h3>
            <p className="text-gray-800 mb-4">
              Kami menyediakan produk ramah lingkungan yang berkualitas tinggi,
              dirancang untuk mendukung gaya hidup berkelanjutan tanpa
              mengorbankan kenyamanan. Dengan setiap pilihan yang Anda buat,
              Anda turut berkontribusi dalam menjaga kelestarian bumi dan
              menciptakan masa depan yang lebih hijau.
            </p>
            <blockquote className="border-l-4 border-yellow-400 pl-4 italic text-gray-700">
              “Dengan setiap produk ramah lingkungan yang Anda pilih, kita
              bersama-sama membangun masa depan yang lebih hijau dan sehat untuk
              generasi mendatang.”
            </blockquote>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white py-16 px-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            Kami Membantu Anda Memilih Produk Berkelanjutan
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Kami menyediakan produk ramah lingkungan yang mendukung gaya hidup
            berkelanjutan dan berkualitas.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-3 rounded-full flex items-center justify-center">
                <PiUsersFourFill className="w-8 h-8 text-white"/>
              </div>
              <h4 className="text-xl font-semibold mb-2">Tim Profesional</h4>
              <p className="text-gray-600">
                Kami hadir dengan tim berpengalaman untuk menyediakan produk
                ramah lingkungan terbaik.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-3 rounded-full flex items-center justify-center">
                <TbTargetArrow className="w-8 h-8 text-white"/>
              </div>
              <h4 className="text-xl font-semibold mb-2">
                Berorientasi pada Keberlanjutan
              </h4>
              <p className="text-gray-600">
                Fokus kami adalah memilih produk yang mendukung gaya hidup
                berkelanjutan.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-3 rounded-full flex items-center justify-center">
               <BiSolidCheckShield className="w-8 h-8 text-white"/>
              </div>
              <h4 className="text-xl font-semibold mb-2">
                Jaminan Dampak Positif
              </h4>
              <p className="text-gray-600">
                Setiap pilihan produk kami berkontribusi pada bumi yang lebih
                hijau.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <FloatingChat/>
    </Fragment>
  );
};

export default About;
