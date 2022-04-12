import bgImg from "../assets/images/slide-5.png";
import bgImg1 from "../assets/images/slide-6.png";
import bgImg2 from "../assets/images/slide-7.png";
import bgImg3 from "../assets/images/categories_2.png";
import { useEffect } from "react";
import "./banner.css";

const Banner = () => {
  var myIndex = 0;
  useEffect(carousel);

  function carousel() {
    var i;
    var x = document.getElementsByClassName("carousel-item");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) {
      myIndex = 1;
    }
    x[myIndex - 1].style.display = "flex";
    setTimeout(carousel, 4000); // Change image every 2 seconds
  }

  return (
    <div className="py-36">
      <div className="flex justify-center items-center ml-64">
        {/* padding makes the container bigger */}
        <div className="p-16">
          <h1 className="text-6xl text-gray-800 font-medium mb-4 capitalize">
            best raw materials for your business.
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ad
            quam sapiente, neque quis pariatur.
          </p>
          <div className="mt-12">
            <a
              href="#"
              className="bg-primary border border-primary text-white px-8 py-3 font-medium rounded-md hover:bg-transparent hover:text-primary transition"
            >
              Shop Now
            </a>
          </div>
        </div>
        <div className="container">
          <div
            id="slide1"
            className="carousel-item relative w-full justify-center"
          >
            <img src={bgImg} className="object-cover elementToFadeInAndOut" />
          </div>
          <div
            id="slide2"
            className="carousel-item relative w-full justify-center"
          >
            <img src={bgImg2} className="object-cover elementToFadeInAndOut" />
          </div>
          <div
            id="slide3"
            className="carousel-item relative w-full justify-center"
          >
            <img src={bgImg3} className="object-cover elementToFadeInAndOut" />
          </div>
          <div
            id="slide4"
            className="carousel-item relative w-full justify-center"
          >
            <img src={bgImg1} className="object-cover elementToFadeInAndOut" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
