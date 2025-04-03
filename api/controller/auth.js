import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  try {
    const newUser = new User({
      username: username,
      email: email,
      password: hash,
    });

    const savedUser = await newUser.save();
    const token = jwt.sign(
      {
        id: savedUser._id,
        isAdmin: savedUser.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 }
    );
    res
      .cookie("authcookie", token, { httpOnly: true })
      .status(200)
      .json({ username: savedUser.username, email: savedUser.email });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_SECRET,
          { expiresIn: 60 * 60 }
        );
        return res
          .cookie("authcookie", token, { httpOnly: true })
          .json("Logged in");
      }
    }
    throw createError(400, "Invalid credentials");
  } catch (error) {
    next(error);
  }
};
