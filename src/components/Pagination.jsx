import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="text-black justify-center flex items-center space-x-2">
      <button className="h-8 w-8 p-1 hover:bg-gray-200 cursor pointer rounded">
        <FaArrowLeft />
      </button>
      <div className="flex space-x-1">
        {pageNumbers.map((number) => (
          <div key={number}>
            <a href="!#" className="hover:bg-gray-200 px-2 rounded">
              {number}
            </a>
          </div>
        ))}
      </div>
      <button className="h-8 w-8 p-1 hover:bg-gray-200 cursor pointer rounded">
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
