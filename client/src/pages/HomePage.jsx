// import Banner from "../components/Banner";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Newsletter from "../components/Newsletter";
import ProductsList from "../components/ProductsList";
import Carousel from "../components/Carousel";
import Banner from "../components/Banner";

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <Banner />
      <Carousel />
      <ProductsList />
      <Categories />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default HomePage;
