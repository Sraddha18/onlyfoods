import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });
      setCookies("access_token", resp.data.token);
      window.localStorage.setItem("userID", resp.data.userID);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className=" rounded flex flex-col  lg:py-10 py-4 gap-4 lg:w-1/3 w-full  bg-[#FAFFFD]   border-[0.05px] items-center  justify-center "
    >
      <h1 className=" font-semibold lg:text-3xl text-xl comfortaa tracking-wider">
        Login
      </h1>
      <div className=" flex flex-col gap-2 ">
        <label className=" comfortaa lg:text-base text-sm font-semibold">
          Username
        </label>
        <input
          className=" bg-black text-white lg:text-base text-sm focus:lg:text-base focus:text-sm rounded p-1 focus: placeholder:text-sm placeholder:text-center placeholder:text-gray-400"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className=" flex flex-col gap-2">
        <label className=" comfortaa lg:text-base text-sm font-semibold">
          Password
        </label>
        <input
          className=" bg-black text-white lg:text-base  text-sm focus:lg:text-base focus:text-sm rounded p-1 focus: placeholder:text-sm placeholder:text-center placeholder:text-gray-400"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className=" px-11 lg:px-0  flex gap-4 flex-col items-center justify-center">
        <button
          className=" px-1 w-full py-1 rounded text-lg comfortaa font-semibold  text-white bg-blue-400"
          type="submit"
        >
          Login
        </button>
        <span className=" text-sm  text-slate-800">
          New user?
          <Link to="/register" className=" text-blue-500">
            Register to continue
          </Link>
        </span>
      </div>
    </form>
  );
};

export default Login;
