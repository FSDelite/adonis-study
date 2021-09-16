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
    if(isAdmin){
      const users = await User.all();

      return users;
    }
    else{
      return {message: "voce nao está autorizado"}
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
  async update({ params, request, response }) {}

  /**
   * Delete a user with id.
   * DELETE users/:id
   */
  async destroy({ params, request, response }) {}
}

module.exports = UserController;
