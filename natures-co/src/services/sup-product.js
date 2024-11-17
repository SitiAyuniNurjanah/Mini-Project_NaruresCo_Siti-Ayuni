import supabase from "./supabaseClient";

export const getAllProducts = async () => {
    try {
        const { data, error } = await supabase
            .from("product")
            .select("*")
            .order("id", { ascending: false });

        if (error) throw error;
        return data; // Mengembalikan data langsung
    } catch (error) {
        console.error("Error fetching products:", error.message);
        return [];
    }
};

// Fungsi untuk mengunggah gambar
export const uploadImage = async (file) => {
    try {
        const fileName = `${Date.now()}-${file.name}`;
        const { data, error } = await supabase.storage
            .from("products")
            .upload(fileName, file);

        const publicUrl = `https://aimgohnijdamdikgoswf.supabase.co/storage/v1/object/public/products/${fileName}`;
        console.log("Data upload:", data);
        if (error) {
            console.error("Error saat upload gambar:", error.message);
            throw error;
        }

        if (!publicUrl) {
            console.error("Error: URL publik tidak berhasil dibuat.");
            throw new Error("Gagal mendapatkan URL publik.");
        }

        console.log("Public URL yang dihasilkan:", publicUrl);
        return publicUrl;
    } catch (err) {
        console.error("Detail error upload:", err);
        throw new Error("Gagal mengupload gambar");
    }
};


export const createProduct = async (product) => {
    try {
        const { data, error } = await supabase
            .from("product")
            .insert(product);

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Gagal membuat produk:", error.message);
        throw error;
    }
};


export const updateProduct = async (id, product) => {
    try {
        const { data, error } = await supabase
            .from("product")
            .update(product)
            .eq("id", id);

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Gagal memperbarui produk:", error.message);
        throw error;
    }
};

export const getProductById = async (productId) => {
    const { data, error } = await supabase
        .from('product')
        .select('*')
        .eq('id', productId)
        .single();

    if (error) throw error;
    return data;
};

export const deleteProduct = async (id, callback) => {
    const { error } = await supabase.from('product').delete().eq('id', id);
    if (error) {
        console.error("Error deleting product:", error);
        callback(false);
    } else {
        callback(true);
    }
};