import React, { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import supabase from "../../services/supabaseClient";
import {
  createProduct,
  updateProduct,
  uploadImage,
} from "../../services/sup-product";
import Sidebar from "./Sidebar";

const FormProduct = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product || null;

  // Inisialisasi nilai form jika mengedit
  useEffect(() => {
    if (product) {
      Object.entries(product).forEach(([key, value]) =>
        setValue(key, value)
      );
    }
  }, [product, setValue]);

  // Ambil data kategori dari database
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("category")
        .select("id, name");
      if (error) console.error("Gagal mengambil kategori:", error);
      else setCategories(data);
    };
    fetchCategories();
  }, []);

  // Handle pengiriman form
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let imageUrl = product?.image_url || null;

      // Upload gambar jika ada file
      if (data.image_url?.[0]) {
        imageUrl = await uploadImage(data.image_url[0]);
      }

      const payload = {
        ...data,
        price: parseInt(data.price),
        quantity: parseInt(data.quantity),
        image_url: imageUrl,
      };

      if (product) {
        await updateProduct(product.id, payload);
        showAlert("success", "Produk berhasil diperbarui!");
      } else {
        await createProduct(payload);
        showAlert("success", "Produk berhasil dibuat!");
        reset();
      }
    } catch (err) {
      console.error("Gagal memproses produk:", err);
      showAlert("error", "Terjadi kesalahan saat memproses produk.");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi menampilkan notifikasi
  const showAlert = (type, message) => {
    Swal.fire({
      icon: type,
      title: type === "success" ? "Berhasil" : "Gagal",
      text: message,
    }).then(() => {
      if (type === "success") navigate("/table-product", { state: { message } });
    });
  };

  // Fungsi reusable untuk input form
  const renderInput = (id, label, type = "text", requiredMessage = "") => (
    <div className="mb-4">
      <label htmlFor={id} className="block text-lg font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="input input-bordered w-full p-3 text-gray-700 rounded-md border-2 border-gray-300"
        {...register(id, { required: requiredMessage })}
      />
      {errors[id] && <p className="text-red-500 text-sm">{errors[id]?.message}</p>}
    </div>
  );

  // Fungsi reusable untuk textarea
  const renderTextarea = (id, label, requiredMessage = "") => (
    <div className="mb-4">
      <label htmlFor={id} className="block text-lg font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <textarea
        id={id}
        rows="4"
        className="textarea textarea-bordered w-full p-3 text-gray-700 rounded-md border-2 border-gray-300"
        {...register(id, { required: requiredMessage })}
      />
      {errors[id] && <p className="text-red-500 text-sm">{errors[id]?.message}</p>}
    </div>
  );

  // Fungsi reusable untuk select
  const renderSelect = (id, label, options, requiredMessage = "") => (
    <div className="mb-4">
      <label htmlFor={id} className="block text-lg font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <select
        id={id}
        className="select select-bordered w-full p-3 text-gray-700 rounded-md border-2 border-gray-300"
        {...register(id, { required: requiredMessage })}
      >
        <option value="">Pilih {label}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {errors[id] && <p className="text-red-500 text-sm">{errors[id]?.message}</p>}
    </div>
  );

  return (
    <Fragment>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 bg-gray-100 p-6 overflow-auto">
          <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-xl border border-gray-300">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-5">
              {product ? "Edit Produk" : "Buat Produk"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              {renderInput("name", "Nama Produk", "text", "Nama produk diperlukan")}
              {renderInput("price", "Harga", "number", "Harga diperlukan")}
              {renderTextarea("description", "Deskripsi Produk", "Deskripsi diperlukan")}
              {renderInput("quantity", "Stok", "number", "Stok diperlukan")}
              {renderSelect("category_id", "Kategori", categories, "Kategori diperlukan")}
              <div className="mb-4">
                <label htmlFor="image_url" className="block text-lg font-semibold text-gray-700 mb-2">
                  Gambar Produk
                </label>
                <input
                  type="file"
                  id="image_url"
                  className="file-input file-input-bordered w-full"
                  {...register("image_url")}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file && !file.type.startsWith("image/")) {
                      showAlert("error", "Harap unggah file gambar yang valid.");
                      e.target.value = null;
                    }
                  }}
                />
              </div>
              <button
                type="submit"
                className={`btn bg-1 text-white hover:bg-3 w-full py-3 mt-4 ${loading ? "opacity-50" : ""}`}
                disabled={loading}
              >
                {loading ? "Menyimpan..." : product ? "Perbarui Produk" : "Buat Produk"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default FormProduct;
