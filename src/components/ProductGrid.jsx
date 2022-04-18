import { useNavigate } from 'react-router-dom';

import ProductGridCard from './ProductGridCard';

const ProductGrid = ({ header, productList, newarrivalBadge, bestsellerBadge, navigateBtn }) => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8">
      <div className="w-full">
        <span className="text-3xl bg-gradient-to-r from-sky-500 to-sky-400 bg-clip-text text-transparent font-bold">{header}</span>
      </div>
      <div className="w-full py-8 flex justify-center items-center flex-wrap gap-5">
        {productList.map((product) => (
          <ProductGridCard key={product.id} product={product} newarrival={newarrivalBadge} bestseller={bestsellerBadge} />
        ))}
      </div>
      <div className="w-full h-11 flex justify-center">
        <button
          onClick={() => navigate(navigateBtn)}
          className="h-full w-1/3 bg-white border-2 border-sky-500 rounded-lg text-sky-500 text-xl font-semibold hover:brightness-125 transition active:scale-95"
        >
          See all {header}
        </button>
      </div>
    </div>
  );
};

export default ProductGrid;
