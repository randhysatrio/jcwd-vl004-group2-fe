import { useNavigate } from 'react-router-dom';

import ProductGridCard from './ProductGridCard';

const ProductGrid = ({ header, productList, newarrivalBadge, bestsellerBadge, navigateTo }) => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8">
      <div className="w-full px-8">
        <span className="text-3xl bg-gradient-to-r from-sky-500 to-sky-400 bg-clip-text text-transparent font-bold">{header}</span>
      </div>
      <div className="w-full py-4 gap-y-6 lg:py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-8 lg:gap-5 px-10 md:px-5 lg:px-8">
        {productList.map((product) => (
          <ProductGridCard key={product.id} product={product} newarrival={newarrivalBadge} bestseller={bestsellerBadge} />
        ))}
      </div>
      <div className="w-full py-4 flex justify-center">
        <button
          onClick={() => navigate(navigateTo)}
          className="h-11 lg:h-12 w-1/2 xl:w-1/3 bg-white border-2 border-sky-500 rounded-lg text-sky-500 text-xl font-semibold hover:brightness-125 transition active:scale-95"
        >
          See all {header}
        </button>
      </div>
    </div>
  );
};

export default ProductGrid;
