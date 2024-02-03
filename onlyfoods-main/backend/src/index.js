import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import recipeRoutes from "./routes/recipes.js";
import { verifyToken } from "./controllers/Users.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

//routes defined for recipes and authentication for the user
app.use("/api/auth", userRoutes);
app.use("/api/recipes", recipeRoutes);
//mongodb connection link
mongoose.connect(process.env.MONGO_URL);

app.listen(process.env.PORT, () => console.log("server is running"));
