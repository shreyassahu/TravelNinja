import User from "../models/User.js";

const getUsers = async (req, res, next) => {
  try {
    const userList = await User.find();
    res.status(200).json(userList);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const oldUser = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, oldUser, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    next(error);
  }
};

export { updateUser, getUsers, getUser, deleteUser };
