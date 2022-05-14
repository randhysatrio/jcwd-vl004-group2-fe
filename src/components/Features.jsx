import truck from '../assets/images/delivery-van.svg';
import money from '../assets/images/money-back.svg';
import service from '../assets/images/service-hours.svg';

const FeatureCard = ({ header, text, img }) => {
  return (
    <div className="border border-primary rounded-lg px-6 py-4 md:px-10 lg:px-12 lg:py-10 xl:px-14 flex justify-center items-center gap-5">
      <img src={img} className="w-12 h-12 object-contain" />
      <div>
        <h4 className="font-medium capitalize text-lg">{header}</h4>
        <p className="text-gray-500 text-sm">{text}</p>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <div className="flex justify-center py-14">
      <div className="w-8/12 px-2 flex flex-col sm:w-10/12 md:grid md:grid-cols-3 md:px-3 gap-6 lg:gap-8">
        <FeatureCard img={truck} header={'Free Shipping'} text={'Order over $200'} />
        <FeatureCard img={money} header={'Money Returns'} text={'30 days money return'} />
        <FeatureCard img={service} header={'24/7 Support'} text={'Customer support'} />
      </div>
    </div>
  );
};

export default Features;
