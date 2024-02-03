import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserID.js";
import { useCookies } from "react-cookie";

const CreateRecipe = () => {
  const [cookies, _] = useCookies("");
  const navigate = useNavigate();
  const userID = useGetUserID();
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };
  const handleIngredientChange = (e, id) => {
    const { value } = e.target;
    const ingredients = recipe.ingredients;
    ingredients[id] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (recipe.userOwner === null) {
        console.log("userowner is undefined");
        return;
      }
      await axios.post("http://localhost:5000/api/recipes", recipe, {
        headers: { authorization: `Bearer ${cookies.access_token}` },
      });
      alert("Recipes created");
    } catch (error) {
      console.error(error);
    }
    alert("Recipes created");
    navigate("/");
  };
  return (
    <div className="   flex flex-col items-center lg:gap-5 gap-1.5 w-full lg:h-auto h-auto justify-center ">
      <form
        className=" rajdhani bg-[#FAFFFD] lg:w-2/5 w-full m-2 border-[0.01px] shadow-sm shadow-red-100   rounded  backdrop-filter backdrop-blur-sm  flex items-center justify-center flex-col lg:gap-5 gap-1.5 py-1.5 lg:py-4"
        onSubmit={onSubmit}
      >
        <h1 className=" font-semibold">Your Recipe</h1>
        <div className="flex gap-1 flex-col">
          <label className=" lg:text-lg text-sm font-sans  font-semibold text-slate-700">
            Name
          </label>
          <input
            className="rounded border-[0.1px] border-black text-white bg-black text-sm lg:text-base  focus:outline-none"
            name="name"
            onChange={handleChange}
            type="text"
          />
        </div>
        <div className=" flex gap-1 flex-col">
          <label className=" text-sm lg:text-lg font-sans  font-semibold text-slate-700">
            Ingredients
          </label>
          {recipe.ingredients.map((ingredient, id) => (
            <input
              className=" text-white bg-black  border-[0.1px] border-black flex flex-col rounded lg:text-base text-sm focus:outline-none lg:gap-2 gap-1 m-1"
              key={id}
              type="text"
              name="ingredients"
              value={ingredient}
              onChange={(e) => handleIngredientChange(e, id)}
            />
          ))}
          <button
            type="button"
            className=" w-full  border-[0.03px] text-black border-black lg:px-2 px-1 text-sm lg:py-1 py-[2px]   font-semibold maven"
            onClick={addIngredient}
          >
            Add Ingredients
          </button>
        </div>
        <div className="flex lg:gap-3 gap-1 flex-col">
          <label className=" lg:text-lg text-sm  maven font-semibold text-slate-700">
            Image URL
          </label>
          <input
            name="imageUrl"
            onChange={handleChange}
            className="border-[0.1px] text-white lg:text-base text-sm bg-black  border-black rounded focus:outline-none"
            type="text"
          />
        </div>
        <div className="flex lg:gap-3 gap-1 flex-col">
          <label className=" lg:text-lg text-sm maven  font-semibold text-slate-700">
            Cooking Time
          </label>
          <input
            className="rounded lg:text-base text-sm text-white bg-black  border-[0.1px] border-black focus:outline-none"
            name="cookingTime"
            onChange={handleChange}
            type="number"
          />
        </div>
        <div className="flex lg:gap-3 gap-1 flex-col">
          <label className=" lg:text-lg text-sm maven  font-semibold text-slate-700">
            Instructions
          </label>
          <input
            className="rounded text-white bg-black lg:text-base text-sm  border-[0.1px] border-black focus:outline-none"
            name="instructions"
            onChange={handleChange}
            type="text"
          />
        </div>
        <button
          className="  bg-sky-600 px-3 py-1 comfortaa text-white font-semibold font-sans"
          type="submit"
        >
          Create Recipe
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
