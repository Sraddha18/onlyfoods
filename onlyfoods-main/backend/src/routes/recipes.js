import express from "express";
import {
  createRecipe,
  getRecipies,
  getRecipeByID,
  getRecipeIdFromSavedRecipies,
  getSavedRecipe,
  saveARecipe,
  removeRecipeFromSavedRecipies,
  getOwnersRecipe,
} from "../controllers/Recipes.js";
import { verifyToken } from "../controllers/Users.js";
const router = express.Router();

router.get("/", getRecipies);
router.post("/", verifyToken, createRecipe);
router.get("/:recipeId", getRecipeByID);
router.put("/", verifyToken, saveARecipe);
router.delete("/:userID/:recipeID", removeRecipeFromSavedRecipies);
router.get("/savedRecipes/ids/:userId", getRecipeIdFromSavedRecipies);
router.get("/savedRecipes/:userId", getSavedRecipe);
router.get("/:id/recipe", getOwnersRecipe);

export default router;
