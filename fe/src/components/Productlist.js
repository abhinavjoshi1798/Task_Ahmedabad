import React, { useEffect, useState } from "react";
import { useSearchParams, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { Box, Button, Grid, Pagination } from "@mui/material";

const Productlist = ({ page, setPage, totalPages, setTotalPages }) => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const [deletedFlag,setDeletedFlag]= useState(false);
  
  

  let obj = {
    params: {
      category: searchParams.getAll("category"),
      sortby: searchParams.get("order") && "price",
      val: searchParams.get("order"),
      page: searchParams.get("page"),
      q: searchParams.get("q"),
    },
  };

  const getProducts = async (obj) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/product/allproducts",
        obj
      );
      // Axios automatically parses JSON response
      console.log(response);
      setProducts(response.data.products); // Update products state if needed
      setTotalPages(response.data.totalPages)
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  useEffect(() => {
    getProducts(obj);
  }, [location.search,deletedFlag]);
  // console.log(location.search)

  console.log(products);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = async (id) => {
    try {
     await axios.delete(`http://localhost:8080/product/delete/${id}`).then((res)=>{
setDeletedFlag(!deletedFlag)
     }).catch(err=>{
      console.log(err.message);
     })
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  }

  return (
    <div className="productListContainer">
      <Box display={"flex"} width={"100%"} paddingTop={2} justifyContent="flex-end">
        <Link to={`/addproduct`}>
    <Button variant="contained" color="primary" 
    style={{marginRight:"20px"}}>Add Product</Button> </Link>
</Box>
  
      <Grid container justify="center" sx={{ marginBottom: "30px" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          style={{ display: "flex", margin: "auto" }}
        >
          {products?.map((product, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingBottom: "10px",
                  boxShadow: 4,
                  borderRadius: "15px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  style={{
                    width: "100%",
                    height: "300px",
                    marginBottom: "8px",
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "60%",
                    margin: "auto",
                  }}
                >
                  <div
                    className="ProductListGridItem"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {"Title : "}
                    {product.title}
                  </div>
                  <div
                    className="ProductListGridItem"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {"Brand : "}
                    {product.brand}
                  </div>
                  <div className="ProductListGridItem">
                    {"Category: "}
                    {product.gender}
                  </div>
                  <div className="ProductListGridItem">
                    {"Price: ₹"}
                    {product.price}
                  </div>
                  <div className="ProductListGridItem">
                    {"Discount: "}
                    {product.discount}%
                  </div>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 2,
                    }}
                  >
                    <Link to={`/edit/${product.id}`}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginTop: "8px" }}
                    >
                      Edit
                    </Button>
                    </Link> 
                    <Button
                      variant="contained"
                      color="error"
                      style={{ marginTop: "8px" }}
                      onClick={()=>handleDelete(product?.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Box
      display={"flex"}
      justifyContent={"center"}
      marginBottom={"50px"}>
      <Pagination count={totalPages} variant="outlined" color="primary"
       page={page}
       onChange={handleChangePage} />

         </Box>
    </div>
  );
};

export default Productlist;