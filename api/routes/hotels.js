import express from "express";

import {
  createHotel,
  getHotels,
  getHotel,
  updateHotel,
  deleteHotel,
} from "../controller/hotel.js";

const router = express.Router();

//CREATE
router.post("/", createHotel);

//READ
router.get("/", getHotels);

//READ BY ID
router.get("/:id", getHotel);

//UPDATE
router.put("/:id", updateHotel);

//DELETE
router.delete("/:id", deleteHotel);

export default router;
