import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Features from "../components/Features";
import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../assets/constants";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userGlobal = useSelector((state) => state.user);
  return (
    <>
      <Header />
      <Navbar />
      <Banner />
      <Features />
      <Categories />
      <ProductCard />
      <Footer />
    </>
  );
}

export default Home;
