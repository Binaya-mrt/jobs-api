const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const { use } = require("../routes/jobs");
const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    throw new BadRequestError("Not a valid email or password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("not authenticated ");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new UnauthenticatedError("Incorrect password");
  }
  const token = user.createJWT();

  res.json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};
