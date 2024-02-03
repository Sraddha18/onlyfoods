import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import imgnotfound from "../assets/imgnotfound.png";

const MyPosts = () => {
  const { id } = useParams();
  const [ownersRecipe, setOwnersRecipe] = useState([]);

  useEffect(() => {
    const fetchOwnersRecipe = async () => {
      try {
        const resp = await axios.get(
          `http://localhost:5000/api/recipes/${id}/recipe`
        );
        if (Array.isArray(resp.data.Recipes)) {
          setOwnersRecipe(resp.data.Recipes);
        } else {
          console.error("Invalid response data. Expected an array.");
          setOwnersRecipe([]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchOwnersRecipe();
  }, [id]);

  return (
    <ul className="flex flex-col gap-4 py-2 px-3">
      {ownersRecipe.map((recipe) => (
        <li
          key={recipe._id}
          className="flex  rounded shadow-sm shadow-[#d6dedb]"
        >
          <Link
            to={`/${recipe._id.toString()}`}
            className="w-1/3 lg:h-1/4 h-1/6  border-[0.1px] border-black border-opacity-30  "
          >
            <img
              className="w-full lg:h-[200px] h-[130px] object-contain lg:object-cover"
              src={recipe.imageUrl}
              alt={recipe.name}
              onError={(e) => {
                e.target.src = imgnotfound;
              }}
            />
          </Link>
          <div className="w-2/3 border-t-[0.2px] border-b-[0.2px] border-r-[0.3px] border-opacity-30 rounded border-[#342E37] flex flex-col items-start bg-[#FAFFFD] gap-3 pl-4 justify-center">
            <h2 className="lg:text-xl text-sm comfortaa font-semibold ">
              {recipe.name}
            </h2>

            <p className=" lg:text-base text-[12px] maven  ">
              Cooking Time: {recipe.cookingTime} minutes
            </p>
            <div className=" flex lg:gap-4 gap-2">
              <Link
                to={`/${recipe._id.toString()}`}
                className=" lg:px-6 px-1.5 lg:py-[2px] py-[1px] text-[12px] lg:text-base   hover:bg-[#FA824C] transition-all border-[0.3px] border-black   hover:text-white text-black rajdhani font-semibold "
              >
                More
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
export default MyPosts;
