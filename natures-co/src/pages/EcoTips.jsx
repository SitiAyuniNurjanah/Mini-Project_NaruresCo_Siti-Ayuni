import React, { Fragment } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import FloatingChat from "../components/layout/FloatingChat";
import {
  FaLightbulb,
  FaTint,
  FaRecycle,
  FaLeaf,
  FaCar,
  FaShoppingBag,
  FaTree,
} from "react-icons/fa";
import { GiFarmer } from 'react-icons/gi';

const DailyTips = () => {
  return (
    <Fragment>
      <Header />
      <div className="bg-6 min-h-screen p-8">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-white mb-4">
            Tips for a Greener World
          </h1>
          <p className="text-white">
            Temukan berbagai tips untuk membuat dunia lebih hijau dan
            berkelanjutan. Terapkan langkah-langkah sederhana ini dalam
            kehidupan sehari-hari.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="card bg-3 p-6 shadow-xl rounded-lg">
            <div className="flex justify-center mb-4">
              <FaLightbulb className="text-6xl text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white text-center mb-2">
              Hemat Energi
            </h2>
            <p className="text-white text-center">
              Matikan lampu dan peralatan saat tidak digunakan, pilih lampu LED,
              atur suhu AC seperlunya, dan cabut charger setelah perangkat
              selesai dicas.
            </p>
          </div>

          {/* Card 2 */}
          <div className="card bg-3 p-6 shadow-xl rounded-lg">
            <div className="flex justify-center mb-4">
              <FaRecycle className="text-6xl text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white text-center mb-2">
              Kelola Sampah
            </h2>
            <p className="text-white text-center">
              Pisahkan sampah organik dan anorganik, kurangi plastik sekali
              pakai, daur ulang barang yang masih berguna, dan buat kompos dari
              sampah organik.
            </p>
          </div>

          {/* Card 3 */}
          <div className="card bg-3 p-6 shadow-xl rounded-lg">
            <div className="flex justify-center mb-4">
              <FaTint className="text-6xl text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white text-center mb-2">
              Hemat Air
            </h2>
            <p className="text-white text-center">
              Perbaiki keran yang bocor, manfaatkan air bekas cucian untuk
              menyiram tanaman, mandi dengan durasi singkat, dan tutup keran
              saat menggosok gigi.
          </p>
          </div>

          {/* Card 4 */}
          <div className="card bg-3  p-6 shadow-xl rounded-lg">
            <div className="flex justify-center mb-4">
              <FaLeaf className="text-6xl text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white text-center mb-2">
              Produk Ramah Lingkungan
            </h2>
            <p className="text-white text-center">
              Pilih produk dengan kemasan minimal yang bisa didaur ulang,
              gunakan pembersih alami, dan hindari bahan kimia berbahaya.
            </p>
          </div>

          {/* Card 5 */}
          <div className="card bg-3 p-6 shadow-xl rounded-lg">
            <div className="flex justify-center mb-4">
              <FaCar className="text-6xl text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white text-center mb-2">
              Transportasi
            </h2>
            <p className="text-white text-center">
              Gunakan transportasi umum, sepeda, atau berjalan kaki; carpool
              jika bisa, dan jaga efisiensi bahan bakar kendaraan.
            </p>
          </div>

          {/* Card 6 */}
          <div className="card bg-3 p-6 shadow-xl rounded-lg">
            <div className="flex justify-center mb-4">
              <FaShoppingBag className="text-6xl text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white text-center mb-2">
              Belanja
            </h2>
            <p className="text-white text-center">
              Bawa tas belanja sendiri, pilih produk lokal dan segar, serta
              hindari membeli barang yang tidak diperlukan.
            </p>
          </div>

          {/* Card 7 */}
          <div className="card bg-3 p-6 shadow-xl rounded-lg">
            <div className="flex justify-center mb-4">
              <FaTree className="text-6xl text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white text-center mb-2">
              Lingkungan Sekitar
            </h2>
            <p className="text-white text-center">
              Tanam pohon, jaga kebersihan lingkungan sekitar, dan laporkan
              tindakan yang merusak lingkungan.
            </p>
          </div>

          {/* Card 8 */}
          <div className="card bg-3 p-6 shadow-xl rounded-lg">
            <div className="flex justify-center mb-4">
              <GiFarmer className="text-6xl text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white text-center mb-2">
              Pertanian Berkelanjutan
            </h2>
            <p className="text-white text-center">
              Terapkan praktik pertanian organik, gunakan pupuk alami, dan
              hindari penggunaan pestisida kimia yang merusak tanah dan air.
            </p>
          </div>
        </div>
      </div>
      <Footer />
      <FloatingChat/>
    </Fragment>
  );
};

export default DailyTips;
