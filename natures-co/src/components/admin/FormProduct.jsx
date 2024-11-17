import React, { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import supabase from "../../services/supabaseClient";
import { createProduct, updateProduct, uploadImage } from "../../services/sup-product";
import Sidebar from "./Sidebar";

const FormProduct = () => {
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product || null;

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("price", product.price);
      setValue("description", product.description);
      setValue("quantity", product.quantity);
      setValue("category_id", product.category_id);
    }
  }, [product, setValue]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("category").select("id, name");
      if (error) {
        console.error("Gagal mengambil kategori:", error);
      } else {
        setCategories(data);
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File yang dipilih:", file); // Debug log
      if (!file.type.startsWith("image/")) {
        alert("Harap unggah file gambar yang valid.");
        e.target.value = null; // Reset input file
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      let imageUrl = product?.image_url || null;

      // Periksa apakah ada file gambar baru yang diunggah
      if (data.image_url && data.image_url[0]) {
        imageUrl = await uploadImage(data.image_url[0]);
        console.log("URL gambar berhasil diunggah:", imageUrl); // Debug log
      }

      const payload = {
        ...data,
        price: data.price,
        quantity: parseInt(data.quantity),
        image_url: imageUrl, // Pastikan ini benar
      };

      if (product) {
        // Update produk
        await updateProduct(product.id, payload);
        alert("Produk berhasil diperbarui!");
      } else {
        // Buat produk baru
        await createProduct(payload);
        alert("Produk berhasil dibuat!");
      }

      reset();
      navigate("/table-product", {
        state: { message: product ? "Produk berhasil diperbarui!" : "Produk berhasil dibuat!" },
      });
    } catch (err) {
      console.error("Gagal memproses produk:", err);
      alert("Terjadi kesalahan saat memproses produk.");
    }
  };

  return (
    <Fragment>
      <div className="flex h-screen"> {/* Flex container untuk sidebar dan form */}
        <Sidebar /> {/* Sidebar di kiri */}
        <div className="flex-1 bg-5 p-6 overflow-auto"> {/* Form Product di kanan */}
          <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-xl border border-gray-300">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-5">
              {product ? "Edit Produk" : "Buat Produk"}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Nama Produk */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-lg font-semibold text-gray-700 mb-2">
                  Nama Produk
                </label>
                <input
                  type="text"
                  id="name"
                  className="input input-bordered w-full p-3 text-gray-700 rounded-md border-2 border-gray-300"
                  {...register("name", { required: "Nama produk diperlukan" })}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              {/* Harga Produk */}
              <div className="mb-4">
                <label htmlFor="price" className="block text-lg font-semibold text-gray-700 mb-2">
                  Harga
                </label>
                <input
                  type="number"
                  id="price"
                  className="input input-bordered w-full p-3 text-gray-700 rounded-md border-2 border-gray-300"
                  {...register("price", { required: "Harga diperlukan" })}
                />
                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
              </div>

              {/* description Produk */}
              <div className="mb-4">
                <label htmlFor="description" className="block text-lg font-semibold text-gray-700 mb-2">
                  description Produk
                </label>
                <textarea
                  id="description"
                  className="textarea textarea-bordered w-full p-3 text-gray-700 rounded-md border-2 border-gray-300"
                  rows="4"
                  {...register("description", { required: "description produk diperlukan" })}
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
              </div>

              {/* Stok Produk */}
              <div className="mb-4">
                <label htmlFor="quantity" className="block text-lg font-semibold text-gray-700 mb-2">
                  Stok
                </label>
                <input
                  type="number"
                  id="quantity"
                  className="input input-bordered w-full p-3 text-gray-700 rounded-md border-2 border-gray-300"
                  {...register("quantity", { required: "Stok diperlukan" })}
                />
                {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
              </div>

              {/* Kategori Produk */}
              <div className="mb-4">
                <label htmlFor="category_id" className="block text-lg font-semibold text-gray-700 mb-2">
                  Kategori
                </label>
                <select
                  id="category_id"
                  className="select select-bordered w-full p-3 text-gray-700 rounded-md border-2 border-gray-300"
                  {...register("category_id", { required: "Kategori diperlukan" })}
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id.message}</p>}
              </div>

              {/* Gambar Produk */}
              <div className="mb-4">
                <label htmlFor="image_url" className="block text-lg font-semibold text-gray-700 mb-2">
                  Gambar Produk
                </label>
                <input
                  type="file"
                  id="image_url"
                  className="file-input file-input-bordered w-full"
                  {...register("image_url")}
                  onChange={handleImageChange}
                />
              </div>

              <button type="submit" className="btn bg-1 text-white hover:bg-5 hover:text-1 w-full py-3 mt-4">
                {product ? "Perbarui Produk" : "Buat Produk"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default FormProduct;
