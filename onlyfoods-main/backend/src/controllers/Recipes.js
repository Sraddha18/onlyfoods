import express from "express";
import mongoose from "mongoose";
import { RecipesModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";

export const getRecipies = async (req, res) => {
  try {
    const recipies = await RecipesModel.find({});
    res.status(200).json(recipies);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createRecipe = async (req, res) => {
  const recipe = new RecipesModel(req.body);
  try {
    const result = await recipe.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getRecipeByID = async (req, res) => {
  try {
    const rid = req.params.recipeId;
    const id = new mongoose.Types.ObjectId(rid);
    const recipe = await RecipesModel.findById({ _id: id });
    if (!recipe) {
      return res.status(404).json(message, "Recipe not found");
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const saveARecipe = async (req, res) => {
  try {
    const recipe = await RecipesModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);

    if (!recipe || !user) {
      return res.status(404).json({ error: "Recipe or user not found" });
    }

    user.savedRecipies.push(recipe);
    await user.save();

    res.status(201).json({ savedRecipies: user.savedRecipies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getRecipeIdFromSavedRecipies = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.status(201).json({ savedRecipies: user?.savedRecipies });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const removeRecipeFromSavedRecipies = async (req, res) => {
  const { userID, recipeID } = req.params;

  try {
    const user = await UserModel.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user?.savedRecipies.pull(recipeID);
    await user.save();
    res.status(200).json({
      savedRecipes: user.savedRecipies,
    });
  } catch (error) {
    console.error("Error removing recipe:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSavedRecipe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const savedRecipes = await RecipesModel.find({
      _id: { $in: user.savedRecipies },
    });
    res.status(200).json({ savedRecipes: savedRecipes });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Internal server error" });
  }
};

export const getOwnersRecipe = async (req, res) => {
  const id = req.params.id;
  try {
    const oid = new mongoose.Types.ObjectId(id);
    const recipe = await RecipesModel.find({
      userOwner: { $in: oid },
    });
    res.status(200).json({ Recipes: recipe });
  } catch (error) {
    console.error(error);
  }
};
