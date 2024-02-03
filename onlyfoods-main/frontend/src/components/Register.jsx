import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        password,
      });
      navigate("/login");
      alert("register success");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh]">
      {" "}
      <form
        onSubmit={handleRegister}
        className=" rounded flex flex-col  lg:py-10 py-4 gap-4 lg:w-1/3 w-full  bg-[#FAFFFD]   border-[0.05px] items-center  justify-center "
      >
        <h1 className=" font-semibold lg:text-3xl text-xl comfortaa tracking-wider">
          Register
        </h1>
        <div className=" flex flex-col gap-2 ">
          <label className=" comfortaa lg:text-base text-sm font-semibold">
            Username
          </label>
          <input
            className=" bg-black text-white lg:text-base text-sm focus:lg:text-base focus:text-sm rounded p-1 focus: placeholder:text-sm placeholder:text-center placeholder:text-gray-400"
            type="text"
            minLength={4}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className=" flex flex-col gap-2">
          <label className=" comfortaa lg:text-base text-sm font-semibold">
            Password
          </label>
          <input
            className=" bg-black text-white lg:text-base text-sm focus:lg:text-base focus:text-sm rounded p-1 focus: placeholder:text-sm placeholder:text-center placeholder:text-gray-400"
            type="password"
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className=" flex  gap-4 flex-col items-center justify-center">
          <button
            className=" px-1 w-full py-1 rounded text-lg comfortaa font-semibold  text-white bg-blue-400"
            type="submit"
          >
            Register
          </button>
          <span className=" text-sm text-slate-800">
            New user?
            <Link to="/login" className=" text-blue-500">
              Login to continue
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
