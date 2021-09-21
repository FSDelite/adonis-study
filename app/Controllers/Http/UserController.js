"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use("App/Models/User");

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   */
  async index({ auth }) {
    const isAdmin = auth.user.is_admin;
    if (isAdmin) {
      const users = await User.all();
      return users;
    } else {
      return { message: "você não está autorizado" };
    }
  }

  /**
   * Create/save a new user.
   * POST users
   */
  async store({ request, response }) {}

  /**
   * Display a single user.
   * GET users/:id
   */
  async show({ params, request, response, view }) {}

  /**
   * Update user details.
   * PUT or PATCH users/:id
   */
  async update({ params, request, response, auth }) {
    const user = await User.findOrFail(params.id);

    if (user.id == auth.user.id || auth.user.is_admin) {
      const data = request.only(["name", "password", "email", "team_id"]);

      const newUser = await User.query().where("id", params.id).update(data);
      return newUser;
    }
    return response.status(401).send("Não autorizado");
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   */
  async destroy({ auth, request, response }) {
    const user = await User.findOrFail(request.params.id);
    //const user = await auth.getUser();

    if (!auth.user.is_admin) {
      return response
        .status(401)
        .send("Não autorizado a deletar a tarefa de outro usuario");
    }
    await user.delete();
  }
}

module.exports = UserController;
