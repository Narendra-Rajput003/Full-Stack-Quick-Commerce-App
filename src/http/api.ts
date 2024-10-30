// api.ts

import { api } from "./client";


export const getAllProducts = async () => {
  try {
    const response = await api.get("/products");
    console.log("Response data:", response.data); // Ensure this logs the full response

    if (response.status === 200) {
      // Adjust this line to match your API response structure
      return response.data.products; // Access the data property that contains the product array
    } else {
      throw new Error("Failed to fetch products");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

export const createProduct = async (data:FormData) => {
  try {
    const response = await api.post("/product", data,{
      headers: {
        'Content-Type': 'multipart/form-data',
    },
    });
    return response.data

  } catch (error) {

    console.error("Error creating products:", error);
    throw new Error("Failed to create products");

  }
}
