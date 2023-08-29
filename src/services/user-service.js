import { users } from "../database/user-db.js";
import { ResponseError } from "../error/response-error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.SECRET_KEY;

const login = ({ username, password }) => {
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    throw new ResponseError(404, "Username and password wrong");
  }

  const token = jwt.sign({ username }, secretKey, {
    expiresIn: 10, // 5 second
  });

  const refreshToken = jwt.sign({ username }, secretKey, {
    expiresIn: 20, // 30 second
  });

  return { token, refreshToken };
};

const refreshToken = (refreshToken) => {
  // validate the token
  const isRefreshToken = jwt.verify(refreshToken, secretKey);
  const { username } = isRefreshToken;
  console.log(isRefreshToken); // {username , password}
  // the token valid we create new token and new refrsh token

  const token = jwt.sign({ username }, secretKey, {
    expiresIn: 10, // 5 second
  });

  const newRefreshToken = jwt.sign({ username }, secretKey, {
    expiresIn: 20, // 30 second
  });

  return { token, newRefreshToken };
};

export default { login, refreshToken };
