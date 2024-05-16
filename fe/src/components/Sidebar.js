// import React, { useEffect, useState } from "react";
// import Checkbox from "@mui/material/Checkbox";
// import { Box, Radio, Typography } from "@mui/material";
// import { useSearchParams } from "react-router-dom";
// import TextField from "@mui/material/TextField";

// const Sidebar = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const initialCategory = searchParams.getAll("category");
//   const initialOrder = searchParams.get("order");
//   const [category, setCategory] = useState(initialCategory || []); // ["male","female"]
//   const [order, setOrder] = useState(initialOrder || "");

//   let pageinital = searchParams.get("page");
//   let [page, setPage] = useState(pageinital || 1);
//   let searchinital = searchParams.get("q");
//   let [search, setSearch] = useState(searchinital||[]);
  


//   const handleChange = (e) => {
//     let newCategory = [...category];
//     const value = e.target.value;
//     if (newCategory.includes(value)) {
//       newCategory = newCategory.filter((el) => el !== value);
//     } else {
//       newCategory.push(value);
//     }
//     setCategory(newCategory);
//     //console.log(searchParams.getAll("category"));
//   };

//   //  console.log(category);

//   let params = {
//     category,
//   };

//   useEffect(() => {
//     page && (params.page = page);
//     page && (params.limit = 6);
//     search && (params.q = search);
//     order && (params.order = order);
//     setSearchParams(params);
//   }, [category, order,page,search]);

//   const handleSort = (e) => {
//     //console.log(e.target.value);
//     setOrder(e.target.value);
//   };

//   console.log("page",page);

//   return (
//     <div className="sideBarContainer">
//       <Typography
//         variant="h5"
//         component="h5"
//         sx={{ margin: "auto", width: "fit-content" }}
//       >
//         Search
//       </Typography>
//       <TextField
//         id="outlined-basic"
//         sx={{
//           width: "80%",
//           display: "flex",
//           margin: "auto",
//           marginTop: "5px",
//           marginBottom: "20px",
//         }}
//         label="Search"
//         variant="outlined"
//         name="search"
//         onChange={(e)=>setSearch(e.target.value)}
//         value={search}
//       />

//       <Typography
//         variant="h5"
//         component="h5"
//         sx={{ margin: "auto", width: "fit-content" }}
//       >
//         Filter By
//       </Typography>
//       <Box className="filterOptions">
//         <Checkbox
//           value={"male"}
//           onChange={handleChange}
//           checked={category.includes("male")}
//         />
//         <Typography variant="p" component={"p"}>
//           Male
//         </Typography>
//       </Box>
//       <Box className="filterOptions">
//         <Checkbox
//           value={"female"}
//           onChange={handleChange}
//           checked={category.includes("female")}
//         />
//         <Typography variant="p" component={"p"}>
//           Female
//         </Typography>
//       </Box>
//       <Box className="filterOptions">
//         <Checkbox
//           value={"kids"}
//           onChange={handleChange}
//           checked={category.includes("kids")}
//         />
//         <Typography variant="p" component={"p"}>
//           Kids
//         </Typography>
//       </Box>

//       <Typography
//         variant="h5"
//         component="h5"
//         sx={{ margin: "auto", marginTop: "20px", width: "fit-content" }}
//       >
//         Sort Based on Price
//       </Typography>
//       <Box className="sortOptions" onChange={handleSort}>
//         <Radio name="order" value="asc" checked={order === "asc"} />
//         <Typography variant="p" component={"p"}>
//           Ascending
//         </Typography>
//       </Box>
//       <Box className="sortOptions" onChange={handleSort}>
//         <Radio name="order" value="desc" checked={order === "desc"} />
//         <Typography variant="p" component={"p"}>
//           Descending
//         </Typography>
//       </Box>
//       <Typography
//         variant="h5"
//         component="h5"
//         sx={{ margin: "auto", marginTop: "20px", width: "fit-content" }}
//       >
//         Page
//       </Typography>
//       <Box className="paginationContainer">
//         <button
//         onClick={() => setPage(page - 1)}
//         disabled={page == 1}
//         >
//           prev
//         </button>

//         <button>
//           <h3>{page}</h3>
//         </button>

//         <button
//         onClick={() => setPage(+page + 1)}
//         // disabled={page === Math.ceil(22 / 10)}
//         >
//           next
//         </button>
//       </Box>
//     </div>
//   );
// };

// export default Sidebar;

import Checkbox from "@mui/material/Checkbox";
import { Box, Radio, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

const Sidebar = ({handleChange,handleSort, setSearch, search, category,
  order
}) => {
  
  return (
    <div className="sideBarContainer">
      <Typography
        variant="h5"
        component="h5"
        sx={{ margin: "auto", width: "fit-content" }}
      >
        Search
      </Typography>
      <TextField
        id="outlined-basic"
        sx={{
          width: "80%",
          display: "flex",
          margin: "auto",
          marginTop: "5px",
          marginBottom: "20px",
        }}
        label="Search"
        variant="outlined"
        name="search"
        onChange={(e)=>setSearch(e.target.value)}
        value={search}
      />

      <Typography
        variant="h5"
        component="h5"
        sx={{ margin: "auto", width: "fit-content" }}
      >
        Filter By
      </Typography>
      <Box className="filterOptions">
        <Checkbox
          value={"male"}
          onChange={handleChange}
          checked={category.includes("male")}
        />
        <Typography variant="p" component={"p"}>
          Male
        </Typography>
      </Box>
      <Box className="filterOptions">
        <Checkbox
          value={"female"}
          onChange={handleChange}
          checked={category.includes("female")}
        />
        <Typography variant="p" component={"p"}>
          Female
        </Typography>
      </Box>
      <Box className="filterOptions">
        <Checkbox
          value={"kids"}
          onChange={handleChange}
          checked={category.includes("kids")}
        />
        <Typography variant="p" component={"p"}>
          Kids
        </Typography>
      </Box>

      <Typography
        variant="h5"
        component="h5"
        sx={{ margin: "auto", marginTop: "20px", width: "fit-content" }}
      >
        Sort Based on Price
      </Typography>
      <Box className="sortOptions" onChange={handleSort}>
        <Radio name="order" value="asc" checked={order === "asc"} />
        <Typography variant="p" component={"p"}>
          Ascending
        </Typography>
      </Box>
      <Box className="sortOptions" onChange={handleSort}>
        <Radio name="order" value="desc" checked={order === "desc"} />
        <Typography variant="p" component={"p"}>
          Descending
        </Typography>
      </Box>
      
    </div>
  );
};

export default Sidebar;







