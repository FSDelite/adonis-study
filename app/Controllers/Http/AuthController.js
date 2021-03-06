"use strict";

const User = use("App/Models/User");
const Team = use("App/Models/Team");
const UnauthorizedException = use("App/Exceptions/UnauthorizedException");
const Hash = use("Hash");

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
    const data = request.only(["name", "cpf", "password", "email", "is_admin"]);
    const user = await User.create(data);
    return user;
  }

  async registerTeam({ request, auth }) {
    if (auth.user.is_admin) {
      const data = request.only(["name", "login", "password"]);
      const team = await Team.create(data);
      return team;
    } else {
      throw new UnauthorizedException("Não autorizado!");
    }
  }

  async authenticate({ request, auth }) {
    const { email, password, login } = request.all();

    if (email) {
      const token = await auth.attempt(email, password);
      return token;
    }
    if (login) {
      email = login;
      const token = await auth.attempt(login, password);
      return token;
    }
  }

  //ESSA FUNÇÃO NAO É MINHA VV
  async changePassword({ request, auth, response, params }) {
    // get currently authenticated user
    const user = await auth.getUser();

    // verify if current password matches
    const verifyPassword = await Hash.verify(
      request.input("password"),
      user.password
    );

    // display appropriate message
    if (!verifyPassword) {
      return response.status(400).json({
        status: "error",
        message: "Current password could not be verified! Please try again.",
      });
    }

    // hash and save new password
    if(user.id == params.id || user.is_admin){
      const newPassword = await Hash.make(request.input("newPassword"));
      const newUser = await User.query().where("id", params.id).update({password: newPassword});
      return newUser;
    }
    else{
      throw new UnauthorizedException("Não autorizado");
    }
  }
}

module.exports = AuthController;
