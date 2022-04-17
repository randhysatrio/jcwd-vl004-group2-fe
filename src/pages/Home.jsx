import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Features from '../components/Features';
import Categories from '../components/Categories';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import Logos from '../components/Logos';

function Home() {
  return (
    <>
      <Header />
      <Navbar />
      <Banner />
      <Logos />
      <Features />
      <Categories />
      <ProductCard />
      <Footer />
    </>
  );
}

export default Home;
