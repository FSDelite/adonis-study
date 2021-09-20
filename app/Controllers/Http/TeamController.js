"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Team = use("App/Models/Team");
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
      //trhow error UNAUTHORIZED
    }
  }

  /**
   * Create/save a new team.
   * POST teams
   */
  async store({ request, auth }) {
    if (auth.user.is_admin) {
      const data = request.only(["name","login", "password"]);
      const team = await Team.create(data);
      return team;
    } else {
      //trhow error UNAUTHORIZED
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
      //trhow error UNAUTHORIZED
    }
  }

  /**
   * Render a form to update an existing team.
   * GET teams/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update team details.
   * PUT or PATCH teams/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a team with id.
   * DELETE teams/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = TeamController;
