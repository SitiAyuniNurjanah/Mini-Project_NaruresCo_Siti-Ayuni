import React, { Fragment } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import FloatingChat from "../components/layout/FloatingChat";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdOutlineMenuBook } from "react-icons/md";
import { BsArrowRepeat } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";
import { FaChild, FaHandsHelping } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { GiRecycle } from "react-icons/gi";

const DailyTips = () => {
  return (
    <Fragment>
      <Header />
      <div className="bg-6 min-h-screen p-8">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-white mb-4">
            Tips Hidup Berkelanjutan
          </h1>
          <p className="text-white">
            Temukan berbagai cara sederhana untuk mendukung lingkungan yang
            lebih hijau dan berkelanjutan. Mulailah menerapkannya dalam
            kehidupan sehari-hari!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="card bg-3 p-6 shadow-xl rounded-lg">
            <div className="flex justify-center mb-4">
              <AiOutlineCheckCircle className="text-6xl text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white text-center mb-2">
              Pilih Produk dengan Bijak
            </h2>
            <p className="text-white text-center">
              Pastikan produk yang Anda pilih benar-benar ramah lingkungan
              dengan memeriksa sertifikasi, seperti GOTS untuk tekstil organik
              atau BPA-free untuk plastik. Pilih produk yang memiliki banyak
              fungsi agar dapat mengurangi kebutuhan membeli barang lain.
            </p>
          </div>

          {/* Card 2 */}
          <div className="card bg-3 p-6 shadow-xl rounded-lg">
            <div className="flex justify-center mb-4">
              <MdOutlineMenuBook className="text-6xl text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white text-center mb-2">
              Gunakan Sesuai Petunjuk
            </h2>
            <p className="text-white text-center">
              Baca label atau panduan pemakaian produk untuk memastikan produk
              digunakan secara optimal dan hindari penggunaan berlebihan
              (misalnya, deterjen atau cairan pembersih).
            </p>
          </div>

          {/* Card 3 */}
          <div className="card bg-3 p-6 shadow-xl rounded-lg">
            <div className="flex justify-center mb-4">
              <BsArrowRepeat className="text-6xl text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white text-center mb-2">
              Maksimalkan Masa Pakai
            </h2>
            <p className="text-white text-center">
              Jangan gunakan produk sekali pakai jika ada alternatif yang lebih
              tahan lama (contoh: gunakan popok kain daripada popok sekali
              pakai) serta Jaga produk agar tetap bersih dan dirawat sesuai
              anjuran, sehingga masa pakai produk lebih panjang.
            </p>
          </div>

          {/* Card 4 */}
          <div className="card bg-3  p-6 shadow-xl rounded-lg">
            <div className="flex justify-center mb-4">
              <FiTrash2 className="text-6xl text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white text-center mb-2">
              Terapkan Gaya Hidup Minim Sampah
            </h2>
            <p className="text-white text-center">
              Kombinasikan produk ramah lingkungan dengan gaya hidup minim
              sampah, seperti membawa tas kain saat belanja atau menggunakan
              botol minum sendiri serta Prioritaskan produk isi ulang
              (refillable) untuk mengurangi pemborosan kemasan.
            </p>
          </div>

          {/* Card 5 */}
          <div className="card bg-3 p-6 shadow-xl rounded-lg">
            <div className="flex justify-center mb-4">
              <FaChild className="text-6xl text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white text-center mb-2">
              Ajak Anak untuk Belajar
            </h2>
            <p className="text-white text-center">
              Untuk produk bayi, ajak anak untuk mengenal manfaat barang-barang
              yang lebih ramah lingkungan. Misalnya, ajarkan mereka pentingnya
              mengurangi sampah serta Gunakan alat makan yang ramah lingkungan,
              seperti dari bambu atau stainless steel, untuk membiasakan
              kebiasaan baik sejak dini.
            </p>
          </div>

          {/* Card 6 */}
          <div className="card bg-3 p-6 shadow-xl rounded-lg">
            <div className="flex justify-center mb-4">
              <MdErrorOutline className="text-6xl text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white text-center mb-2">
              Hindari Kebiasaan yang Merusak
            </h2>
            <p className="text-white text-center">
              Hindari mencuci berlebihan atau menggunakan bahan kimia keras yang
              dapat mempercepat kerusakan produk serta Jangan memaksa produk
              menahan beban berlebih, seperti membawa barang terlalu berat di
              tas kain.
            </p>
          </div>

          {/* Card 7 */}
          <div className="card bg-3 p-6 shadow-xl rounded-lg">
            <div className="flex justify-center mb-4">
              <GiRecycle className="text-6xl text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white text-center mb-2">
              Cari Alternatif untuk Produk Harian
            </h2>
            <p className="text-white text-center">
              Ganti kertas tisu dengan kain lap yang dapat dicuci, Gunakan sabun
              batang organik sebagai pengganti sabun cair dalam kemasan plastik
              dan Ganti produk plastik sekali pakai dengan material seperti
              kaca, logam, atau bambu.
            </p>
          </div>

          {/* Card 8 */}
          <div className="card bg-3 p-6 shadow-xl rounded-lg">
            <div className="flex justify-center mb-4">
              <FaHandsHelping className="text-6xl text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white text-center mb-2">
              Bagikan dan Donasikan
            </h2>
            <p className="text-white text-center">
              Jika produk sudah tidak digunakan (tetapi masih layak), bagikan
              kepada orang lain atau donasikan. Dengan begitu, produk tersebut
              tetap bermanfaat dan tidak menjadi sampah.
            </p>
          </div>
        </div>
      </div>
      <Footer />
      <FloatingChat />
    </Fragment>
  );
};

export default DailyTips;
