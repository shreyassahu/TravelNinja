import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifytoken = (req, res, next) => {
  const token = req.cookies.authcookie;
  if (!token) {
    return next(createError(401, "Not logged in"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(createError(401, "Not logged in"));

    req.user = user;

    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifytoken(req, res, () => {
    if (req.params.id === req.user.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifytoken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    }
    return next(createError(403, "You are not permitted"));
  });
};
