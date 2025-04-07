import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

const getRooms = async (req, res, next) => {
  try {
    const roomList = await Room.find();
    res.status(200).json(roomList);
  } catch (error) {
    next(error);
  }
};

const getRoom = async (req, res, next) => {
  const { id } = req.params;
  try {
    const room = await Room.findById(id);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

const updateRoom = async (req, res, next) => {
  const { id } = req.params;
  const newRoom = req.body;
  try {
    const updatedRoom = await Room.findByIdAndUpdate(id, newRoom, {
      new: true,
    });
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

const deleteRoom = async (req, res, next) => {
  const { id, hotelId } = req.params;
  try {
    const deletedRoom = await Room.findByIdAndDelete(id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json("Deleted Room");
  } catch (error) {
    next(error);
  }
};

export { createRoom, updateRoom, getRooms, getRoom, deleteRoom };
