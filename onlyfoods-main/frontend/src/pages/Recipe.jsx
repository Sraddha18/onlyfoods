import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import imgnotfound from "../assets/imgnotfound.png";
import {
  FaFacebookSquare,
  FaWhatsappSquare,
  FaSnapchatSquare,
  FaInstagramSquare,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

import { MdContentCopy } from "react-icons/md";

const Recipe = () => {
  const [recipe, setRecipe] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const { _id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/recipes/${_id}`
        );
        setRecipe(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecipes();
    getRecipe();
  }, [_id]);

  return (
    <div className=" w-full  my-2   flex rounded h-auto  lg:h-[85vh]">
      <div className=" flex lg:p-2 p-[3px] bg-[#FAFFFD] flex-col lg:gap-3 gap-2 items-start    shadow-sm shadow-red-100 rounded lg:mx-3 mx-1.5  h-auto w-1/6 ">
        {recipes.map((rec, index) => (
          <Link
            key={index}
            to={`/${rec._id.toString()}`}
            className=" flex overflow-hidden items-center lg:text-base text-[11px]  justify-center hover:text-white  border-[0.3px] shadow-sm hover:bg-[#FA824C]    bg-[#D0E7FF] transition-all maven uppercase  lg:px-3 px-2 py-1 w-full  rounded "
          >
            {rec.name}
          </Link>
        ))}
      </div>
      <div className=" bg-[#FAFFFD] flex gap-3  flex-col items-start justify-start  px-4 lg:px-10 py-2   shadow-sm shadow-red-100 rounded lg:mx-3 mx-1  h-full w-4/6">
        <div className=" h-1/2 border-[0.08px] w-full   rounded">
          <div className=" w-full h-full ">
            <img
              className=" w-full lg:w-2/3 lg:h-[95%] h-full bg-gray-200  lg:object-cover object-contain rounded shadow-md shadow-gray-200 lg:mt-2 lg:ml-5 border-[0.1px] border-red-100"
              src={recipe.imageUrl}
              alt={recipe.name}
              onError={(e) => {
                e.target.src = imgnotfound;
              }}
            />
          </div>
        </div>
        <div className="  p-2 shadow-sm shadow-gray-300 flex flex-col lg:gap-4 gap-1  items-start pl-2 lg:pl-16 w-full  h-1/2 ">
          <h1 className=" text-[#FA824C]  flex  confortaa lg:text-xl text-sm uppercase font-semibold  ">
            {recipe.name}
          </h1>
          <p className=" maven lg:text-sm text-[10px] lg:py-1 py-[2px] lg:px-2 px-1.5 bg-[#D0E7FF] rounded  ">
            Cooking Time: {recipe.cookingTime} minutes
          </p>
          <div className=" flex flex-col w-full">
            <h5 className=" font-semibold rajdhani text-sm lg:text-base">
              Ingredients:
            </h5>
            <span className=" maven flex  lg:gap-2 gap-1 text-[10px] lg:text-sm w-full ">
              {recipe.ingredients?.map((rec, ind) => (
                <span
                  className=" py-[1px] lg:px-2 px-1 flex lg:gap-2 gap-1  text-[10px]   lg:text-sm border-gray-400 border-[0.07px]"
                  key={ind}
                >
                  {rec}
                </span>
              ))}
            </span>
          </div>
          <div className=" flex flex-col">
            <h5 className=" font-semibold rajdhani text-sm lg:text-base">
              Instructions:
            </h5>
            <span className=" maven lg:text-sm text-[10px] ">
              {recipe.instructions}
            </span>
          </div>

          <span className=" overflow-hidden flex flex-col   comfortaa uppercase lg:text-sm text-[10px] font-semibold ">
            <span> Post By:</span>
            <span className=" lg:text-sm text-[8px]">{recipe.userOwner}</span>
          </span>
        </div>
      </div>
      <div className=" bg-[#FAFFFD] flex gap-2 flex-col items-start p-1   shadow-sm shadow-red-100 rounded  lg:mx-3 mx-[3px] h-auto w-1/12">
        <button
          className="lg:text-sm text-[8px] w-full   bg-[#D0E7FF] lg:py-1 py-[2px]  maven"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
        <div className="  flex items-center justify-center gap-2 w-full flex-col">
          <button className="flex items-center justify-center">
            <FaFacebookSquare className=" lg:text-5xl text-lg text-blue-500" />
          </button>
          <button>
            <FaSnapchatSquare className="lg:text-5xl text-lg text-amber-200" />
          </button>
          <button>
            <FaWhatsappSquare className="lg:text-5xl text-lg text-green-400" />
          </button>
          <button>
            <FaSquareXTwitter className="lg:text-5xl text-lg text-black" />
          </button>
          <button>
            <FaInstagramSquare className="lg:text-5xl text-lg text-red-300" />
          </button>
          <button>
            <MdContentCopy className="  lg:text-5xl text-lg   text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
