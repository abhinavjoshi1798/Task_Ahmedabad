const express = require("express");
const {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");

const productRouter = express.Router();

// Base Route to make first user (admin and employee)
productRouter.post("/create", createProduct);

// Get All Products
productRouter.get("/allproducts", getAllProduct);

// Get Single Product
productRouter.get("/singleproduct/:id", getSingleProduct);

// Update Product
productRouter.put("/updateproduct/:id", updateProduct);

// delete product
productRouter.delete("/delete/:id",deleteProduct)

module.exports = {
  productRouter,
};
