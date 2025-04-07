import Hotel from "../models/Hotel.js";
const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(err);
  }
};

const getHotels = async (req, res, next) => {
  try {
    const hotelList = await Hotel.find();
    res.status(200).json(hotelList);
  } catch (error) {
    next(error);
  }
};

const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const hotelCountList = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(hotelCountList);
  } catch (error) {
    next(error);
  }
};

const countByType = async (req, res, next) => {
  const types = ["Hotel", "Apartment", "Resort", "Villa", "Cabin"];
  try {
    const typeCountList = await Promise.all(
      types.map((type) => {
        return Hotel.countDocuments({ type: type });
      })
    );
    res.status(200).json(typeCountList);
  } catch (error) {
    next(error);
  }
};

const getHotel = async (req, res, next) => {
  const { id } = req.params;
  try {
    const hotel = await Hotel.findById(id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

const updateHotel = async (req, res, next) => {
  const { id } = req.params;
  const oldHotel = req.body;
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(id, oldHotel, {
      new: true,
    });
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};

const deleteHotel = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(id);
    res.status(200).json(deletedHotel);
  } catch (error) {
    next(error);
  }
};

export {
  createHotel,
  updateHotel,
  getHotels,
  getHotel,
  deleteHotel,
  countByCity,
  countByType,
};
