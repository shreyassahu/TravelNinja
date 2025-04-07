import express from "express";
import { verifyAdmin, verifytoken, verifyUser } from "../utils/verifyToken.js";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
} from "../controller/room.js";

const router = express.Router();

//CREATE
router.post("/:hotelId", verifyAdmin, createRoom);

//READ
router.get("/", getRooms);

//READ BY ID
router.get("/:id", getRoom);

//UPDATE
router.put("/:id", verifyAdmin, updateRoom);

//DELETE
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);

export default router;
