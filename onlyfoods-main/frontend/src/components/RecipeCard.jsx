// import logopng from "../assets/logopng.png";

// const RecipeCard = (recipe) => {
//  const saveRecipe = async (recipeID) => {
//    try {
//      const response = await axios.put(
//        "http://localhost:5000/api/recipes",
//        {
//          recipeID,
//          userID,
//        },
//        {
//          headers: { authorization: cookies.access_token },
//        }
//      );
//      setSavedRecipes(response.data.savedRecipes);
//    } catch (err) {
//      console.log(err);
//    }
//  };

//  const isRecipeSaved = (id) => savedRecipes && savedRecipes.includes(id);

//   return (
//     <div className=" p-2 border-slate-600 rounded border-[0.2px] flex gap-2 w-full m-1">
//       <div className=" border-red-400 border-[0.1px] w-1/3">
//         <img className=" w-full object-cover" src={recipe.imageUrl} />
//       </div>
//       <div className=" w-2/3">
//         <li
//           key={recipe._id}
//           className=" bg-slate-300 rounded shadow-sm shadow-black"
//         >
//           <div>
//             <h2>{recipe.name}</h2>
//             <button
//               onClick={() => saveRecipe(recipe._id)}
//               disabled={isRecipeSaved(recipe._id)}
//             >
//               {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
//             </button>
//           </div>
//           <div className="instructions">
//             <p>{recipe.instructions}</p>
//           </div>
//           <img src={recipe.imageUrl} alt={recipe.name} />
//           <p>Cooking Time: {recipe.cookingTime} minutes</p>
//         </li>
//       </div>
//     </div>
//   );
// };

// export default RecipeCard;
