"use strict";

const User = require("../../Models/User");

class AuthController {
  async register({ request }) {
    const data = request.only([
      "name",
      "cpf",
      "password",
      "email",
      "team_id",
      "sector_id",
    ]);
    const user = await User.create(data);
    return user;
  }

  async authenticate({ request }) {
    const { email, password } = request.all();

    const token = await auth.attempt(email, password);

    return token;
  }
}

module.exports = AuthController;
