import styled from "styled-components";
import NavBar from "../components/NavBar";
import ProductsListByCat from "../components/ProductsListByCat";
import Footer from "../components/Footer";
import { mobile } from "../responsiveMobile.js";
// import { useLocation } from "react-router";
import { useState, useEffect } from "react";
// import { actions } from "../redux/productSlice";
import { useSelector } from "react-redux";
// import { getProductsByCategory } from "../redux/apiProduct";
import { useHistory } from "react-router";
import Loader from "../components/Loader";
import axios from "axios";

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 15px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;

const CategoryPage = () => {
  // const location = useLocation();
  // get the category type from path
  // console.log(location.pathname.split("/"));
  // const category = location.pathname.split("/")[1];
  // console.log(category);
  // sort & filter state
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const [colors, setColors] = useState("");
  // const dispatch = useDispatch();
  const history = useHistory();

  let category = history.location.search; //to pass to backend
  // console.log(category); //?category=shirt&page=1

  const { catStatus } = useSelector((state) => state.products);
  // console.log(catStatus);
  // handle filters onChange
  const handleFilters = (e) => {
    const value = e.target.value;
    // use spread to capture all prev selected filters
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  const getDistinctColor = async (e) => {
    try {
      const { data } = await axios.get("/api/products/distinct/colors/", {
        headers: {
          "Content-type": "application/json",
        },
      });
      setColors(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDistinctColor();
  }, []);

  // colors.forEach((color) => console.log(color["color"]));
  // colors.map((color) => console.log(color["color"]));

  return (
    <>
      {catStatus === "loading" ? (
        <Loader />
      ) : (
        <>
          <NavBar />

          <div className="p-4">
            <h2 className="m-3">
              Category: {category.split("?category=")[1].split("&")[0]}
            </h2>

            <FilterContainer>
              <Filter>
                <FilterText>Color:</FilterText>
                {/* <Select name="color" onChange={handleFilters}>
                  <option defaultValue="true">All</option>
                  <option>white</option>
                  <option>black</option>
                  <option>red</option>
                  <option>blue</option>
                  <option>yellow</option>
                  <option>green</option>
                  <option>orange</option>
                  <option>pink</option>
                  <option>brown</option>
                  <option>mixed</option>
                </Select> */}
                {colors ? (
                  <Select name="color" onChange={handleFilters}>
                    <option defaultValue="true">All</option>
                    {colors.map((color) => (
                      <option>{color["color"]}</option>
                    ))}
                  </Select>
                ) : (
                  <Loader />
                )}

                <FilterText>Size:</FilterText>
                <Select name="size" onChange={handleFilters}>
                  <option defaultValue="true">All</option>
                  <option>XS</option>
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                </Select>

                {/* <FilterText>Gender:</FilterText>
                <Select name="gender" onChange={handleFilters}>
                  <option defaultValue="true">All</option>
                  <option>man</option>
                  <option>women</option>
                  <option>unisex</option>
                </Select> */}
              </Filter>
              <Filter>
                <FilterText>Sort options:</FilterText>
                <Select onChange={(e) => setSort(e.target.value)}>
                  <option value="prices">Sort by Price</option>
                  <option value="asc">Prices (low to high)</option>
                  <option value="desc">Prices (high to low)</option>
                </Select>
              </Filter>
            </FilterContainer>
            {/* pass filtering props to productsList component */}
            <ProductsListByCat
              category={category}
              filters={filters}
              sort={sort}
            />
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default CategoryPage;
