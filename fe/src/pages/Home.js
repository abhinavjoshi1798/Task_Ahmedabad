import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Productlist from "../components/Productlist";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.getAll("category");
  const initialOrder = searchParams.get("order");
  const [category, setCategory] = useState(initialCategory || []); // ["male","female"]
  const [order, setOrder] = useState(initialOrder || "");

  let pageinital = searchParams.get("page");
  let [page, setPage] = useState(pageinital || 1);
  const [totalPages,setTotalPages] = useState(1)
  let searchinital = searchParams.get("q");
  let [search, setSearch] = useState(searchinital || []);

  const handleChange = (e) => {
    let newCategory = [...category];
    const value = e.target.value;
    if (newCategory.includes(value)) {
      newCategory = newCategory.filter((el) => el !== value);
    } else {
      newCategory.push(value);
    }
    setCategory(newCategory);
    //console.log(searchParams.getAll("category"));
  };

  //  console.log(category);

  let params = {
    category,
  };

  useEffect(() => {
    page && (params.page = page);
    page && (params.limit = 6);
    search && (params.q = search);
    order && (params.order = order);
    setSearchParams(params);
  }, [category, order, page, search]);

  const handleSort = (e) => {
    //console.log(e.target.value);
    setOrder(e.target.value);
  };

  console.log("page", page);

  return (
    <div className="AppContainer">
      <Sidebar
        handleSort={handleSort}
        handleChange={handleChange}
        setSearch={setSearch}
        search={search}
        category={category}
        order={order}
        page={page}
        setPage={setPage}
      />
      <Productlist  page={page}
        setPage={setPage}
        totalPages={totalPages}
        setTotalPages={setTotalPages} />
    </div>
  );
};

export default Home;
