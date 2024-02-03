import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { UserModel } from "../models/Users.js";
import { Types, ObjectId } from "mongoose";

export const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username: username });
    if (user) {
      return res.status(400).json({ message: "username already exists" });
    }
    const hashedpass = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      username: username,
      password: hashedpass,
    });
    await newUser.save();
    res.json({ message: "user registered successfully" });
  } catch (error) {
    console.error(error);
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username: username });
    if (!user) {
      return res
        .status(400)
        .json({ message: "incorrect username or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "incorrect username or password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET);
    res.json({ token, userID: user._id });
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const usr = req.headers["user"];
    // Use req.headers['user'] instead of req.headers.user
    const userid = new mongoose.Types.ObjectId(usr);

    const user = await UserModel.findById(userid);

    if (!user) {
      return res.json({ message: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserById = async (req, res) => {
  const id = new Types.ObjectId(req.params.userID);
  console.log(id);
  try {
    const user = await UserModel.findById({ _id: id });
    if (!user) {
      return res.json({ message: "user not found" });
    }
    return user;
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (req, res) => {
  const { about } = req.body;
  const user = await UserModel.findById(req.body.userID);
  try {
    if (!user) {
      res.status(500).json({ status: "unauthorized" });
    }
    user.about = about;
    await user.save();
    res.status(201).json({ user: user });
  } catch (error) {
    console.error(error);
  }
};

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        console.log("invalid token");
        return res.sendStatus(403);
      }
      req.headers.userid = decoded.id;
      next();
    });
  } else {
    console.log("unauthorized");
    res.sendStatus(401);
  }
};
