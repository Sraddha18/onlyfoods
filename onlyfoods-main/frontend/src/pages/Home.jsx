import { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { Link } from "react-router-dom";
import axios from "axios";
import { LuSearch } from "react-icons/lu";
import { useCookies } from "react-cookie";
import { FaQuestion } from "react-icons/fa";
import imgnotfound from "../assets/imgnotfound.png";

import { FaUserAlt } from "react-icons/fa";
const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies("");
  const [searchQuery, setSearchQuery] = useState("");
  const [updateProfile, setUpdateProfile] = useState(false);
  const [about, setAbout] = useState("");
  const [updatedUser, setUpdatedUser] = useState([]);
  const [user, setUser] = useState([]);

  const userID = useGetUserID();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userID");
    if (loggedInUser) {
      try {
        const founduser = JSON.parse(loggedInUser);
        console.log(founduser);
      } catch (error) {
        console.error("error parsing", error);
      }
    }
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchUser = async () => {
      try {
        if (loggedInUser !== null) {
          const resp = await axios.get("http://localhost:5000/api/auth/user", {
            headers: { user: loggedInUser },
          });
          setUser(resp.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
    fetchRecipes();
    fetchSavedRecipes();
  }, [userID, about]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/recipes",
        {
          recipeID,
          userID,
        },
        {
          headers: { authorization: `Bearer ${cookies.access_token}` },
        }
      );

      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        "http://localhost:5000/api/auth/user",
        {
          userID,
          about,
        },
        {
          headers: { authorization: cookies.access_token },
        }
      );
      setUpdatedUser(response.data);
      setAbout("");
    } catch (error) {
      console.error(error);
    }
  };

  const isRecipeSaved = (id) => savedRecipes && savedRecipes.includes(id);

  return (
    <div className="w-full h-full lg:gap-2  gap-1 flex">
      <div className="fixed maven  flex-col flex items-center lg:gap-6 gap-2 justify-start lg:p-3 p-1.5 m-1 w-1/5 lg:w-1/4 h-[85vh]  bg-[#FAFFFD] shadow-red-200 rounded ">
        {!cookies.access_token ? (
          <>
            <span className="lg:p-6 p-2 rounded-full bg-[#FAFFFD] shadow-sm shadow-red-200 ">
              <FaQuestion className=" lg:text-3xl text-sm" />
            </span>
          </>
        ) : (
          <>
            <span className="lg:p-6 p-2 rounded-full bg-[#FAFFFD] shadow-sm shadow-red-200 ">
              <FaUserAlt className=" lg:text-3xl text-lg" />
            </span>
            <span className=" lg:px-4 px-1 lg:py-1 py-[2px] lg:text-base text-[10px] w-full border-[0.3px] shadow-sm hover:bg-[#FA824C]  font-semibold rajdhani bg-[#D0E7FF] transition-all hover:text-white  flex items-center justify-center ">
              {user.username}
            </span>
            <span className=" w-full lg:py-3 py-[1.5px] lg:px-4 px-[3px] lg:text-base text-[8px]  hover:text-white  border-[0.3px] shadow-sm hover:bg-[#FA824C]   rounded rajdhani bg-[#D0E7FF] transition-all ">
              {user.about}
            </span>
            {updatedUser === "" ? (
              <span className="w-full lg:py-3 py-[1.5px] lg:px-4 px-[3px] lg:text-base text-[10px]  border-[0.3px] shadow-sm hover:bg-[#FA824C]  font-semibold rajdhani bg-[#D0E7FF] transition-all hover:text-white  flex items-center justify-center ">
                {updatedUser.about}
              </span>
            ) : (
              <>
                <button
                  onClick={() => setUpdateProfile((prev) => !prev)}
                  className=" w-full lg:py-3 py-[1.5px] lg:px-4 px-[3px] lg:text-base text-[10px]  border-[0.3px] shadow-sm hover:bg-[#FA824C]  font-semibold rajdhani bg-[#D0E7FF] transition-all hover:text-white  flex items-center justify-center "
                >
                  Update Profile
                </button>
              </>
            )}

            {updateProfile ? (
              <form
                onSubmit={handlesubmit}
                className=" lg:px-4 px-1 w-full flex-col lg:flex-row  lg:py-1 py-[1.5px] lg:w-full flex  gap-2 border-[0.3px] border-black  rounded "
              >
                <input
                  type="text"
                  className="  focus:outline-none lg:px-4 px-1 border-[0.04px] text-[9px] lg:text-base  lg:py-1 py-[1px] lg:w-full "
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
                <button
                  type="submit"
                  className=" lg:px-2 px-[2px] lg:text-base text-[9px] w-full py-[1px]  lg:py-[2px] bg-slate-700 text-white  font-semibold "
                >
                  Update
                </button>
              </form>
            ) : (
              ""
            )}
            <Link
              to="/create-recipe"
              className=" w-full lg:py-3 py-[1.5px] lg:px-4 px-[3px] lg:text-base text-[10px] border-[0.3px] shadow-sm hover:bg-[#FA824C]  font-semibold rajdhani bg-[#D0E7FF] transition-all hover:text-white  flex items-center justify-center "
            >
              Create
            </Link>
            <Link
              to="/saved-recipe"
              className=" w-full lg:py-3 py-[1.5px] lg:px-4 px-[3px] lg:text-base text-[10px] border-[0.3px] shadow-sm hover:bg-[#FA824C]  font-semibold rajdhani bg-[#D0E7FF] transition-all hover:text-white  flex items-center justify-center "
            >
              Saved Recipies
            </Link>
            <Link
              to={`/${userID}/posts`}
              className=" w-full lg:py-3 py-[1.5px] lg:px-4 px-[3px] lg:text-base text-[10px]  border-[0.3px] shadow-sm hover:bg-[#FA824C]  font-semibold rajdhani bg-[#D0E7FF] transition-all hover:text-white  flex items-center justify-center "
            >
              My Posts
            </Link>
            <span className=" w-full lg:py-3 py-[1.5px] lg:px-4 px-[3px] lg:text-base text-[10px] border-[0.3px] shadow-sm hover:bg-[#FA824C]  font-semibold rajdhani bg-[#D0E7FF] transition-all hover:text-white  flex items-center justify-center ">
              Search
            </span>
          </>
        )}
      </div>
      <div className="absolute h-full lg:pl-4 pl-1.5 right-0 lg:m-1  w-3/4">
        <div className=" font-semibold gap-2   uppercase flex items-center justify-between w-full shadow-sm shadow-red-200 my-1 lg:my-3 px-2 lg:px-4 rounded py-1 lg:py-2 bg-[#FAFFFD]">
          <span className=" text-[12px] lg:text-xl">Recipes</span>
          <div className=" lg:px-3 px-1 py-[2px]   lg:py-1   bg-[#342E37] flex lg:gap-3 gap-1 items-center justify-center">
            <LuSearch className=" text-[#FA824C] lg:text-lg text-sm" />
            <input
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
              className="  w-full lg:text-base text-[12px] focus:lg:text-base focus:text-[12px]   focus:outline-none focus:backdrop-brightness-0"
            />
          </div>
        </div>

        <ul className="flex flex-col gap-4">
          {recipes
            .filter((recipe) => {
              if (searchQuery === "") {
                return recipe;
              } else if (
                recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
              ) {
                return recipe;
              }
            })
            .map((recipe) => (
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
                    <button
                      className=" lg:px-6 px-1.5 lg:py-[2px] py-[1px] text-[12px] lg:text-base  hover:bg-[#FA824C] transition-all border-[0.3px] border-black   hover:text-white text-black rajdhani font-semibold "
                      onClick={() => saveRecipe(recipe._id)}
                      disabled={isRecipeSaved(recipe._id)}
                    >
                      {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                    </button>
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
      </div>
    </div>
  );
};

export default Home;
