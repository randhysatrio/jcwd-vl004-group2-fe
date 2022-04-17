import gsk from '../assets/images/logos/gsk.png';
import jnj from '../assets/images/logos/j&j.png';
import moderna from '../assets/images/logos/moderna.png';
import pfizer from '../assets/images/logos/pfizer.png';
import roche from '../assets/images/logos/roche.png';

const Logos = () => {
  return (
    <div className="container flex flex-col my-14 items-center">
      <div className="w-3/4 py-3">
        <span className="font-bold text-xl text-zinc-400">Trusted by:</span>
      </div>
      <div className="w-full h-28 flex">
        <div className="w-1/5 h-full flex justify-center items-center">
          <a href="https://www.gsk.com/en-gb/home/" target="_blank" className="h-1/2">
            <img src={gsk} className="h-full object-contain" />
          </a>
        </div>
        <div className="w-1/5 h-full flex justify-center items-center">
          <a href="https://www.jnj.com/" target="_blank" className="h-3/4">
            <img src={jnj} className="h-full object-contain" />
          </a>
        </div>
        <div className="w-1/5 h-full flex justify-center items-center">
          <a href="https://www.modernatx.com/" target="_blank" className="w-[70%]">
            <img src={moderna} className="w-full object-contain" />
          </a>
        </div>
        <div className="w-1/5 h-full flex justify-center items-center">
          <a href="https://www.pfizer.com/" target="_blank" className="w-[45%]">
            <img src={pfizer} className="w-full object-contain" />
          </a>
        </div>
        <div className="w-1/5 h-full flex justify-center items-center">
          <a href="https://www.roche.com/" target="_blank" className="w-[35%]">
            <img src={roche} className="w-full object-contain" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Logos;
