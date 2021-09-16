"use strict";

const User = use("App/Models/User");

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
  async registerAdmin({ request }) {
    const data = request.only([
      "name",
      "cpf",
      "password",
      "email",
      "is_admin",
    ]);
    const user = await User.create(data);
    return user;
  }

  async authenticate({ request, auth }) {
    const { email, password } = request.all();

    const token = await auth.attempt(email, password);

    return token;
  }
}

module.exports = AuthController;
