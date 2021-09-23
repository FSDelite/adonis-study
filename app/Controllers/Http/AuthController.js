"use strict";

const User = use("App/Models/User");
const Team = use("App/Models/Team");
const UnauthorizedException = use("App/Exceptions/UnauthorizedException");

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

    if(email){
    const token = await auth.attempt(email, password);
      return token;
  }
    if(login){
      email = login;
      const token = await auth.attempt(login, password);
      return token;
    }
    
  }
}

module.exports = AuthController;
