import bgImg3 from "../assets/images/categories_1.jpg";

const Categories = () => {
  return (
    <div className="container py-16">
      <h2 className="text-3xl font-medium text-gray-800 uppercase mb-6">
        shop by category
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {/* single category */}
        <div className="relative h-72 rounded-sm overflow-hidden group bg-no-repeat bg-center bg-[url('./assets/images/slide-5.png')]">
          <a
            href="#"
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-50 transition"
          >
            APIs
          </a>
        </div>
        {/* single category end*/}
        {/* single category */}
        <div className="relative h-72 rounded-sm overflow-hidden group bg-no-repeat bg-center bg-[url('./assets/images/slide-6.png')]">
          {/* <img src="./assets/categories_1.jpg" className="w-full" /> */}
          <a
            href="#"
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-50 transition"
          >
            Intermediates
          </a>
        </div>
        {/* single category end*/}
        {/* single category */}
        <div className="relative h-72 rounded-sm overflow-hidden group bg-no-repeat bg-center bg-[url('./assets/images/slide-7.png')]">
          {/* <img src="./assets/categories_1.jpg" className="w-full" /> */}
          <a
            href="#"
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-50 transition"
          >
            Additive
          </a>
        </div>
        {/* single category end*/}
        {/* single category */}
        <div className="relative h-72 rounded-sm overflow-hidden group bg-no-repeat bg-center bg-[url('./assets/images/categories_1.jpg')]">
          {/* <img src="./assets/categories_1.jpg" className="w-full" /> */}
          <a
            href="#"
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-50 transition"
          >
            Natural Extract
          </a>
        </div>
        {/* single category end*/}
        {/* single category */}
        <div className="relative h-72 rounded-sm overflow-hidden group bg-no-repeat bg-center bg-[url('./assets/images/categories_2.png')]">
          {/* <img src="./assets/categories_1.jpg" className="w-full" /> */}
          <a
            href="#"
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-50 transition"
          >
            Fine Chemical
          </a>
        </div>
        {/* single category end*/}
        {/* single category */}
        <div className="relative h-72 rounded-sm overflow-hidden group bg-no-repeat bg-center bg-[url('./assets/images/slide-7.png')]">
          {/* <img src="./assets/categories_1.jpg" className="w-full" /> */}
          <a
            href="#"
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-50 transition"
          >
            Excipient
          </a>
        </div>
        {/* single category end*/}
      </div>
    </div>
  );
};

export default Categories;
