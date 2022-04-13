import truck from "../assets/images/delivery-van.svg";
import money from "../assets/images/money-back.svg";
import service from "../assets/images/service-hours.svg";


const Features = () => {
  return (
    <div className="container py-16">
      <div className="w-10/12 grid grid-cols-3 gap-6 mx-auto justify-center">
        {/* single feature */}
        <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
          <img src={truck} className="w-12 h-12 object-contain" />
          <div>
            <h4 className="font-medium capitalize text-lg">Free Shopping</h4>
            <p className="text-gray-500 text-sm">order over $200</p>
          </div>
        </div>
        {/* single featur end */}
        {/* single feature */}
        <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
          <img
            src={money}
            className="w-12 h-12 object-contain"
            alt=""
          />
          <div>
            <h4 className="font-medium capitalize text-lg">Money returns</h4>
            <p className="text-gray-500 text-sm">30 Days money return</p>
          </div>
        </div>
        {/* single featur end */}
        {/* single feature */}
        <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
          <img
            src={service}
            className="w-12 h-12 object-contain"
            alt=""
          />
          <div>
            <h4 className="font-medium capitalize text-lg">24/7 Support</h4>
            <p className="text-gray-500 text-sm">Customer Support</p>
          </div>
        </div>
        {/* single feature end */}
      </div>
    </div>
  );
};

export default Features;
