import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

import { FaPowerOff } from "react-icons/fa6";
import { RiLoginCircleLine } from "react-icons/ri";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/login");
  };

  return (
    <div className=" dark  flex dark:bg-slate-700 dark:text-white items-center  bg-[#FAFFFD] w-full  justify-between border-[0.1px] shadow-red-200 rounded m-1  px-5 gap-2 py-2  lg:gap-4 lg:px-20 lg:py-4 ">
      <Link to="/">
        <img
          src={logo}
          className=" w-[80%] lg:w-full h-[25px]  lg:h-[30px] object-contain  "
        />
      </Link>
      <div className=" flex items-center justify-between lg:gap-10 gap-3 font-sans font-semibold ">
        {!cookies.access_token ? (
          <Link
            className="  lg:flex items-center px-2 lg:px-4 lg:py-1 py-[2px] text-[8px] lg:text-base  justify-center gap-2 shadow-sm shadow-[#FA824C] uppercase text-white  bg-[#FA824C] rounded-full  "
            to="/login"
          >
            <span className=" hidden lg:flex">Login</span>
            <RiLoginCircleLine className="  lg:text-xl text-sm" />
          </Link>
        ) : (
          <>
            <Link
              className="   px-2 lg:px-4 lg:py-1 py-[2px] text-[8px] lg:text-base  lg:flex hidden shadow-sm shadow-[#FA824C]  uppercase bg-[#FA824C] text-white  rounded "
              to="/saved-recipe"
            >
              Saved
            </Link>
            <Link
              className=" px-2 lg:px-4 lg:py-1 py-[2px] text-[8px] lg:text-base  shadow-sm shadow-[#FA824C]  uppercase  bg-[#FA824C] text-white  rounded "
              to="/create-recipe"
            >
              Create
            </Link>
            <button
              className="p-1 rounded-full flex items-center justify-center  shadow-sm border-[0.1px]  border-[#FA824C]"
              onClick={logout}
            >
              <FaPowerOff className=" font-800 lg:text-xl text-[11px] text-[#FA824C]" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
