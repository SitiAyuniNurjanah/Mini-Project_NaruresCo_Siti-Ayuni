import React, { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { createCategory, updateCategory, uploadImage } from "../../services/sup-category";
import Sidebar from "./Sidebar";

const FormCategory = () => {
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.state?.category || null;

  useEffect(() => {
    if (category) {
      setValue("name", category.name);
      setValue("description", category.description);
    }
  }, [category, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File yang dipilih:", file);
      if (!file.type.startsWith("image/")) {
        console.log("Harap unggah file gambar yang valid.");
        e.target.value = null;
      }
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let imageUrl = category?.image_url || null;
      if (data.image_url && data.image_url[0]) {
        imageUrl = await uploadImage(data.image_url[0], "category");
        console.log("URL gambar berhasil diunggah:", imageUrl);
      }

      const payload = {
        ...data,
        image_url: imageUrl,
      };

      if (category) {
        await updateCategory(category.id, payload);
        console.log("Kategori berhasil diperbarui!");
        navigate("/table-category", {
          state: { message: "Kategori berhasil diperbarui!" },
        });
      } else {
        await createCategory(payload);
        console.log("Kategori berhasil dibuat!");
        reset();
      }
    } catch (err) {
      console.error("Gagal memproses kategori:", err);
    }
  };

  return (
    <Fragment>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 bg-gray-100 p-6 overflow-auto">
          <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-xl border border-gray-300">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-5">
              {category ? "Edit Kategori" : "Buat Kategori"}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Nama Kategori */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-lg font-semibold text-gray-700 mb-2"
                >
                  Nama Kategori
                </label>
                <input
                  type="text"
                  id="name"
                  className="input input-bordered w-full p-3 text-gray-700 rounded-md border-2 border-gray-300"
                  {...register("name", { required: "Nama kategori diperlukan" })}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              {/* Deskripsi */}
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-lg font-semibold text-gray-700 mb-2"
                >
                  Deskripsi
                </label>
                <textarea
                  id="description"
                  className="textarea textarea-bordered w-full p-3 text-gray-700 rounded-md border-2 border-gray-300"
                  rows="4"
                  {...register("description", { required: "Deskripsi kategori diperlukan" })}
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
              </div>

              {/* Upload Gambar */}
              <div className="mb-4">
                <label
                  htmlFor="image_url"
                  className="block text-lg font-semibold text-gray-700 mb-2"
                >
                  Gambar Kategori
                </label>
                <input
                  type="file"
                  id="image_url"
                  className="file-input file-input-bordered w-full"
                  {...register("image_url")}
                  onChange={handleImageChange}
                />
              </div>

              <button
                type="submit"
                className={`btn bg-1 text-white hover:bg-3 w-full py-3 mt-4 ${
                  loading ? "opacity-50" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Menyimpan..." : category ? "Perbarui Kategori" : "Buat Kategori"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default FormCategory;
