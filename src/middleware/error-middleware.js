import { ResponseError } from "../error/response-error.js";
import jwt from "jsonwebtoken";

export const errorMiddleware = (err, req, res, next) => {
  if (!err) {
    next();
  }

  if (err instanceof jwt.JsonWebTokenError) {
    return res.status(401).json({ error: "Unautorized" }); // invalid signature, jwt must be provided
  }

  if (err instanceof ResponseError) {
    return res.status(err.status).json({
      errors: err.messages,
    });
  } else {
    // handle unexpected error
    res.status(500).json({ errors: err.message }).end();
  }
};
