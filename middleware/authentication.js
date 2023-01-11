const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  //check headers

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Not authorized");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // attach the user to job routes
    req.user = {
      userId: payload.userID,
      name: payload.name,
    };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Not authorized");
  }
};
module.exports = auth;
