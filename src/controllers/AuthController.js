const httpStatus = require("http-status");
const AuthService = require("../service/AuthService");
const TokenService = require("../service/TokenService");
const UserService = require("../service/UserService");
const logger = require("../config/logger");
const { tokenTypes } = require("../config/tokens");

class AuthController {
  constructor() {
    this.userService = new UserService();
    this.tokenService = new TokenService();
    this.authService = new AuthService();
  }

  register = async (req, res) => {
    try {
      const user = await this.userService.createUser(req.body);
      let tokens = {};
      const { status } = user.response;
      if (user.response.status) {
        tokens = await this.tokenService.generateAuthTokens(user.response.data);
      }

      const { message, data } = user.response;
      res.status(user.statusCode).send({ status, message, data, tokens });
    } catch (e) {
      // logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  checkEmail = async (req, res) => {
    try {
      const isExists = await this.userService.isEmailExists(
        req.body.email.toLowerCase()
      );
      res.status(isExists.statusCode).send(isExists.response);
    } catch (e) {
      // logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await this.authService.loginWithEmailPassword(
        email.toLowerCase(),
        password
      );
      const { message } = user.response;
      const { data } = user.response;
      const { status } = user.response;
      const code = user.statusCode;
      let tokens = {};
      if (user.response.status) {
        tokens = await this.tokenService.generateAuthTokens(data);
      }
      delete data.password;
      delete data.id;
      delete data.uuid;
      res.status(user.statusCode).send({ status, code, message, data, tokens });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  logout = async (req, res) => {
    await this.authService.logout(req, res);
    res.status(httpStatus.NO_CONTENT).send({ message: "Logout successful!" });
  };

  refreshTokens = async (req, res) => {
    try {
      const refreshTokenDoc = await this.tokenService.verifyToken(
        req.body.refresh_token,
        tokenTypes.REFRESH
      );
      const user = await this.userService.getUserByUuid(
        refreshTokenDoc.user_uuid
      );
      if (user == null) {
        res.status(httpStatus.BAD_GATEWAY).send("User Not Found!");
      }
      await this.tokenService.removeTokenById(refreshTokenDoc.id);
      const tokens = await this.tokenService.generateAuthTokens(user);
      delete user.dataValues.password;
      delete user.dataValues.id;
      delete user.dataValues.uuid;
      delete user.dataValues.email_verified;
      res.send({
        status: true,
        data: { user, tokens },
        message: "Token successfully refreshed, old token blacklisted!",
      });
    } catch (e) {
      // logger.error(e);
      res
        .status(httpStatus.BAD_GATEWAY)
        .send({ status: false, message: e.toString() });
    }
  };

  changePassword = async (req, res) => {
    try {
      const responseData = await this.userService.changePassword(
        req.body,
        req.user.uuid
      );
      res.status(responseData.statusCode).send(responseData.response);
    } catch (e) {
      // logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };
}

module.exports = AuthController;
