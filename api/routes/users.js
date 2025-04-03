import express from "express";

import {
  updateUser,
  getUsers,
  getUser,
  deleteUser,
} from "../controller/user.js";
import { verifyAdmin, verifytoken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkAuthentication", verifytoken, (req, res, next) => {
//   const user = req.user;
//   res.json(`${user.id} is logged in`);
// });

// router.get("/checkUser/:id", verifyUser, (req, res, next) => {
//   res.json("You can delete your account");
// });

// router.get("/checkAdmin/:id", verifyAdmin, (req, res, next) => {
//   res.json("You are permitted to delete all accounts");
// });
//READ
router.get("/", getUsers);

//READ BY ID
router.get("/:id", getUser);

//UPDATE
router.put("/:id", updateUser);

//DELETE
router.delete("/:id", deleteUser);

export default router;
