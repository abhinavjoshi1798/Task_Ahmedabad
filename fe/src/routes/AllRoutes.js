import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import EditProduct from '../pages/EditProduct'
import AddProduct from '../pages/AddProduct'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path={"/"} element={<Home />} />
      <Route path ={"/edit/:id"} element={<EditProduct />} />
      <Route path ={"/addproduct"} element={<AddProduct />} />
    </Routes>
  )
}

export default AllRoutes
