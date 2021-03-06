"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Team = use("App/Models/Team");
const UnauthorizedException = use("App/Exceptions/UnauthorizedException");
/**
 * Resourceful controller for interacting with teams
 */
class TeamController {
  /**
   * Show a list of all teams.
   * GET teams
   */
  async index({ auth }) {
    if (auth.user.is_admin) {
      const teams = Team.all();
      return teams;
    } else {
      throw new UnauthorizedException("Não autorizado!");
    }
  }

  /**
   * Create/save a new team.
   * POST teams
   */
  async store({ request, auth }) {
    //IMPLEMENTAR: fazer a criação de time passar pelo auth
    if (auth.user.is_admin) {
      const data = request.only(["name", "login", "password"]);
      const team = await Team.create(data);
      return team;
    } else {
      throw new UnauthorizedException("Não autorizado!");
    }
  }

  /**
   * Display a single team.
   * GET teams/:id
   */
  async show({ params, auth }) {
    if (auth.user.is_admin) {
      // SELECT * FROM teams JOIN users ON teams.id = users.team_id WHERE teams.id = 1
      const team = await Team.query()
        .innerJoin("users", "teams.id", "users.team_id")
        .where("teams.id", params.id)
        .fetch();
      return team;
    } else {
      throw new UnauthorizedException("Não autorizado!");
    }
  }

  /**
   * Update team details.
   * PUT or PATCH teams/:id
   */
  async update({ params, request, auth }) {
    const teamf = await Team.findOrFail(params.id);

    if (teamf.id != auth.id || !auth.user.is_admin) {
      throw new UnauthorizedException("Não autorizado!");
    } else {
      const data = request.only(["name", "login", "password"]);
      const team = await Team.query().where("id", params.id).update(data);
      return team;
    }
  }

  /**
   * Delete a team with id.
   * DELETE teams/:id
   */
  async destroy({ auth, request }) {
    const team = await Team.findOrFail(request.params.id);
    if (auth.user.is_admin) {
      await team.delete();
    }
    throw new UnauthorizedException("Não autorizado!");
  }
}

module.exports = TeamController;
