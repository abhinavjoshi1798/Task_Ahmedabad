import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false)

  const getData = async (id) => {
    await axios
      .get(`http://localhost:8080/product/singleproduct/${id}`)
      .then((res) => {
        console.log(res);
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  };
  console.log(product);

  useEffect(() => {
    getData(id);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    setTimeout(async()=>{
      await axios.put(`http://localhost:8080/product/updateproduct/${id}`,product).then(res=>{
    console.log(res);
    toast.success("Product Edited Successfully")
    setProduct(res.data)
    setLoading(false)
   }).catch(err=>{
    console.log(err.message);
    setLoading(false)
    setError(true)
    toast.error(err.message)
   })
    },1000)
   
  };

  return (
    <div
      className="min-h-screen bg-gray-100 flex flex-col justify-center items-center"
      style={{ width: "100%" }}
    >
        <ToastContainer />
      <div className="bg-white shadow-md rounded px-16 pt-8 pb-12 my-24 lg:w-2/4 lg:max-w-512 md:w-4/5 sm:w-4/5 sm:max-w-512 md:max-w-512 sm:max-w-512 md:max-w-512 sm:max-w-512 md:max-w-512 md:w-5/6 sm:w-11/12">
        <h1 className="text-3xl mb-4 text-center">Edit Product</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor={"image"}
              className="block text-gray-600 font-semibold mb-2"
            >
              Image
            </label>
            <input
              name="image"
              id="image"
              type="text"
              required
              value={product?.image || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor={"title"}
              className="block text-gray-600 font-semibold mb-2"
            >
              Title
            </label>

            <input
              name="title"
              id="title"
              type="text"
              value={product?.title || ""}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor={"brand"}
              className="block text-gray-600 font-semibold mb-2"
            >
              Brand
            </label>

            <input
              name="brand"
              id="brand"
              type="text"
              value={product?.brand || ""}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor={"category"}
              className="block text-gray-600 font-semibold mb-2"
            >
              Category
            </label>

            <select
              name="gender"
              id="gender"
              value={product?.gender || ""}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              autoComplete="off"
            >
              <option value="kids">Kids</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor={"price"}
              className="block text-gray-600 font-semibold mb-2"
            >
              {"Price: ₹"}
            </label>

            <input
              name="price"
              id="price"
              type="number"
              value={product?.price || ""}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor={"discount"}
              className="block text-gray-600 font-semibold mb-2"
            >
              {"Discount: %"}
            </label>

            <input
              name="discount"
              id="discount"
              type="number"
              value={product.discount || ""}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
          </div>

          <button
              className={`${
                loading ? "bg-blue-200 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"
              } text-white font-bold py-2 px-4 rounded-full w-full`}
            type="submit"
            disabled={loading}
          >
           {loading?"...Loading":"Edit"}
          </button>

          
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
