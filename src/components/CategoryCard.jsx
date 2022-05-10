import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ name, img }) => {
  const navigate = useNavigate();

  return (
    <div className="h-40 lg:h-52 px-3 flex items-center">
      <div
        onClick={() => {
          navigate(`/products/${name}`);
        }}
        className="w-full h-36 lg:h-44 xl:h-48 cursor-pointer active:scale-95 transition"
      >
        <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-lg relative group">
          <img
            src={img}
            className="w-full object-contain -translate-y-3 group-hover:translate-y-3 md:-translate-y-1 md:group-hover:translate-y-1 xl:-translate-y-3 xl:group-hover:translate-y-3 transition-all"
          />
          <span className="absolute z-10 text-2xl md:text-sm lg:text-xl xl:text-2xl textShadow font-bold text-white brightness-110 group-hover:text-sky-400 transition">
            {name}
          </span>
          <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition" />
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
