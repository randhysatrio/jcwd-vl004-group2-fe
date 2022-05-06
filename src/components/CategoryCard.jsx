import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ name, img }) => {
  const navigate = useNavigate();

  return (
    <div className="h-60 flex-1 px-3 flex items-center">
      <div
        onClick={() => {
          navigate(`/products/${name}`);
        }}
        className="w-full h-52 cursor-pointer active:scale-95 transition"
      >
        <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-lg relative group">
          <img src={img} className="w-full object-contain -translate-y-3 group-hover:translate-y-3 transition-all" />
          <span className="absolute z-10 text-2xl textShadow font-bold text-white brightness-110 group-hover:text-sky-400 transition">
            {name}
          </span>
          <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition" />
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
