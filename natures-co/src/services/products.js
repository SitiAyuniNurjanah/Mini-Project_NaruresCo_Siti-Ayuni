import axios from "axios";
export const apiKey = 'AIzaSyA3Ru2YYav99k7q1INneyYKs189gvl6sHE';

const url = 'https://67376417aafa2ef22233a997.mockapi.io/product';

// fungsi untuk create produk baru
export const createProduct = async (formData, callback) => {
    try {
        const response = await axios.post(url, formData, {
            headers: { 'Content-Type': 'application/json' }
        });
        callback(true, response.data);
    } catch (error) {
        console.error("Error creating product:", error);
        callback(false, error.message);
    }
};

// fungsi untuk semua produk
export const getAllProducts = async (callback) => {
    try {
        const response = await axios.get(url);
        callback(response.data);
    } catch (error) {
        console.error("Error fetching product:", error);
    }
};

// fungsi untuk update produk menurut ID
export const updateProduct = async (id, formData, callback) => {
    try {
        const response = await axios.put(`${url}/${id}`, formData, {
            headers: { 'Content-Type': 'application/json' }
        });
        callback(response.data);
    } catch (error) {
        console.error("Error updating product:", error);
    }
};

// fungsi untuk menghapus product
export const deleteProduct = async (id, callback) => {
    try {
        const response = await axios.delete(`${url}/${id}`);
        callback(true, response.data);
    } catch (error) {
        console.error("Error deleting product:", error);
        callback(false, error.message);
    }
};