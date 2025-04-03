import User from "../models/User.js";
export const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const newUser = new User({
      username: username,
      email: email,
      password: password,
    });

    await newUser.save();
    res.status(200).send("User has been created");
  } catch (error) {}
};
