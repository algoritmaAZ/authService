import userService from "../services/user-service.js";

const login = (req, res, next) => {
  try {
    const { username, password } = req.body;
    const { token, refreshToken } = userService.login({ username, password });

    res
      .status(200)
      .cookie("token", token)
      .cookie("refreshToken", refreshToken)
      .json({ data: "OK" });
  } catch (err) {
    next(err);
  }
};

const refreshToken = (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const { token, newRefreshToken } = userService.refreshToken(refreshToken);

    res
      .status(200)
      .cookie("token", token)
      .cookie("refreshToken", newRefreshToken)
      .json({ data: "OK" });
  } catch (err) {
    next(err);
  }
};

export default { login, refreshToken };
