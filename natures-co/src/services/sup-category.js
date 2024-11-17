import supabase from './supabaseClient';

// --- Fungsi untuk Kategori ---

// Mengambil semua kategori
export const getAllCategories = async () => {
  try {
    const { data, error } = await supabase
      .from("category")
      .select("*")
      .order("id", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    return [];
  }
};

// Fungsi untuk mengunggah gambar
export const uploadImage = async (file) => {
  try {
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("category") // Nama bucket untuk kategori
      .upload(fileName, file);

    const publicUrl = `https://aimgohnijdamdikgoswf.supabase.co/storage/v1/object/public/category/${fileName}`;
    
    if (error) {
      console.error("Error saat upload gambar:", error.message);
      throw error;
    }

    if (!publicUrl) {
      console.error("Error: URL publik tidak berhasil dibuat.");
      throw new Error("Gagal mendapatkan URL publik.");
    }

    return publicUrl;
  } catch (err) {
    console.error("Detail error upload:", err);
    throw new Error("Gagal mengupload gambar");
  }
};

// Fungsi untuk menambah kategori
export const createCategory = async (category) => {
  try {
    const { data, error } = await supabase
      .from("category")
      .insert(category);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Gagal membuat kategori:", error.message);
    throw error;
  }
};

// Fungsi untuk memperbarui kategori
export const updateCategory = async (id, category) => {
  try {
    const { data, error } = await supabase
      .from("category")
      .update(category)
      .eq("id", id);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Gagal memperbarui kategori:", error.message);
    throw error;
  }
};

// Fungsi untuk menghapus kategori
export const deleteCategory = async (id, callback) => {
  try {
    const { error } = await supabase.from('category').delete().eq('id', id);
    if (error) throw error;
    callback(true);
  } catch (error) {
    console.error("Error deleting category:", error.message);
    callback(false);
  }
};
