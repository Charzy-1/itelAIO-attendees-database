import { Link } from "react-router-dom";
import { styles } from '../styles';

const Navbar = () => {
  return (
    <div className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}>
      <div className="w-full flex justify-center sm:justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2 bg-white rounded-xl px-2 py-1"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <img
            src="/images/logo.png"
            alt="company logo"
            className="w-[50px] h-[40px] object-contain"
            loading="lazy"
          />
          <p className="text-red-500 text-[18px] font-bold cursor-pointer flex">
            Energy &nbsp;
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
