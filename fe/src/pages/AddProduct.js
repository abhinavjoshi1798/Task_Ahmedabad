import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  image: Yup.string()
    .required("Image is Required")
    .min(10, "Minimum length of image url should be 10")
    .max(100, "Maximum length of image url should be 100"),

  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 8 characters")
    .max(20, "Title must be at max 20 characters"),

  brand: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 8 characters")
    .max(20, "Title must be at max 20 characters"),

  gender: Yup.string().required("Gender is required"),

  price: Yup.number().required("Price is required."),

  discount: Yup.number().required("Discount is required."),
});

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState({
    image: "",
    title: "",
    gender: "",
    brand: "",
    price: "",
    discount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const onSubmit = async (values) => {
    console.log("product just before validating", values);
    const errors = await Formik.validateForm();
    if (Object.keys(errors).length === 0) {
      console.log("values from login", values);
      setLoading(true);
      setTimeout(()=>{ axios.post("http://localhost:8080/product/create",values).then((res)=>{
        console.log(res)
        setLoading(false);
        Formik.resetForm();
        toast.success("Product Added Successfully")
      }).catch(err=>{
        console.log(err);
        setLoading(false);
        setError(true);
        toast.error(err.message)
      })},1000)
     
  };
}

  const Formik = useFormik({
    initialValues: product,
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit,
  });

  return (
    <div
      className="min-h-screen bg-gray-100 flex flex-col justify-center items-center"
      style={{ width: "100%" }}
    >
          <ToastContainer />
      <div className="bg-white shadow-md rounded px-16 pt-8 pb-12 my-24 lg:w-2/4 lg:max-w-512 md:w-4/5 sm:w-4/5 sm:max-w-512 md:max-w-512 sm:max-w-512 md:max-w-512 sm:max-w-512 md:max-w-512 md:w-5/6 sm:w-11/12">
        <h1 className="text-3xl mb-4 text-center">Add Product</h1>
        <form className="space-y-4" onSubmit={Formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor={"image"}
              className="block text-gray-600 font-semibold mb-2"
            >
              Image
            </label>
            {Formik.errors && (
              <p className="text-red-500">{Formik.errors.image}</p>
            )}
            <input
              name="image"
              id="image"
              type="text"
              value={Formik.values.image}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
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
            {Formik.errors && (
              <p className="text-red-500">{Formik.errors.title}</p>
            )}
            <input
              name="title"
              id="title"
              type="text"
              value={Formik.values.title}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
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
            {Formik.errors && (
              <p className="text-red-500">{Formik.errors.brand}</p>
            )}
            <input
              name="brand"
              id="brand"
              type="text"
              value={Formik.values.brand}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              
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
            {Formik.errors && (
              <p className="text-red-500">{Formik.errors.gender}</p>
            )}
            <select
              name="gender"
              id="gender"
              value={Formik.values.gender}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              autoComplete="off"
            >
                <option value="">Select</option>
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
            {Formik.errors && (
              <p className="text-red-500">{Formik.errors.price}</p>
            )}
            <input
              name="price"
              id="price"
              type="number"
              value={Formik.values.price}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
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
            {Formik.errors && (
              <p className="text-red-500">{Formik.errors.discount}</p>
            )}
            <input
              name="discount"
              id="discount"
              type="number"
              value={Formik.values.discount}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
          </div>

          <button
            className={`${
              loading
                ? "bg-blue-200 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold py-2 px-4 rounded-full w-full`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Add New Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
