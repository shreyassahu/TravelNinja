import express from "express";

import {
  createHotel,
  getHotels,
  getHotel,
  updateHotel,
  deleteHotel,
  countByCity,
  countByType,
} from "../controller/hotel.js";
import { verifyAdmin, verifytoken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createHotel);

//READ
router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

//READ BY ID
router.get("/find/:id", getHotel);

//UPDATE
router.put("/:id", verifyAdmin, updateHotel);

//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

export default router;
