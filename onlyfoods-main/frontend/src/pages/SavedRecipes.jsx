import { useEffect, useState } from "react";

import axios from "axios";
import imgnotfound from "../assets/imgnotfound.png";
import { Link } from "react-router-dom";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  const [uid, setUid] = useState("");
  const userID = uid;

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userID");
    if (loggedInUser) {
      setUid(loggedInUser);
    }

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSavedRecipes();
  }, [userID, savedRecipes]);

  const deleteRecipe = async (recipeID) => {
    try {
      const resp = await axios.delete(
        `http://localhost:5000/api/recipes/${userID}/${recipeID}`
      );

      setSavedRecipes(resp.data.savedRecipes);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-screen  ">
      <h1 className=" flex items-center justify-center px-5 py-2 font-semibold text-xl comfortaa">
        Saved Recipes
      </h1>
      <ul className=" flex items-center  flex-col lg:gap-8 gap-3">
        {savedRecipes.map((recipe) => (
          <li
            className="  lg:mx-2 mx-[2px] h-1/4 w-4/5 border-slate-300 border-4 flex flex-col items-center justify-center lg:flex-row  rounded shadow-sm shadow-black"
            key={recipe._id ? recipe._id.toString() : Math.random().toString()}
          >
            <div className=" w-1/3  h-1/2">
              <img
                className="w-full lg:h-full h-1/2  object-cover  "
                src={recipe.imageUrl}
                alt={recipe.name}
                onError={(e) => {
                  e.target.src = imgnotfound;
                }}
              />
            </div>
            <div className=" flex items-center  w-full justify-center lg:flex-row flex-col  h-1/2">
              <div className=" w-1/2 flex gap-3 flex-col items-center justify-center pl-5">
                <h2 className=" comfortaa font-semibold lg:text-xl text-[12px] uppercase ">
                  {recipe.name}
                </h2>
                <p className=" lg:flex hidden  maven ">
                  Cooking Time: {recipe.cookingTime} minutes
                </p>
              </div>
              <div className=" w-1/2 flex lg:gap-3 gap-1.5  items-center justify-center">
                <button
                  onClick={() => deleteRecipe(recipe._id.toString())}
                  className="rajdhani font-semibold lg:px-3 px-1.5 lg:text-base text-[12px] lg:py-1 py-[2px] border-[0.1px] border-black transition-all hover:text-white hover:scale-105  hover:bg-[#FA824C]"
                >
                  Remove
                </button>
                <Link
                  to={`/${recipe._id.toString()}`}
                  className="rajdhani font-semibold lg:px-3 px-1.5 lg:text-base text-[12px] lg:py-1 py-[2px] border-[0.1px] border-black transition-all hover:text-white hover:scale-105  hover:bg-[#FA824C]"
                >
                  More
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SavedRecipes;
