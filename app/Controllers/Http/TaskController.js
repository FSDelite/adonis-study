"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Task = use("App/Models/Task");

/**
 * Resourceful controller for interacting with tasks
 */
class TaskController {
  /**
   * Show a list of all tasks.
   * GET tasks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const tasks = await Tasks.query().with("user").fetch;

    return tasks;
  }

  async store({ request, auth }) {
    const data = request.only([
      "name",
      "description",
      "link",
      "start_date",
      "finish_date",
    ]);
    const task = await Task.create({ user_id: auth.user.id, ...data });
    return task;
  }

  async show({ params }) {
    const task = await Task.findOrFail(params.id);
    return task;
  }

  /**
   * Update task details.
   * PUT or PATCH tasks/:id
   */
  async update({ params, request, response }) {}

  /**
   * Delete a task with id.
   * DELETE tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, auth }) {
    const task = await Task.findOrFail(params.id);

    if (task.user_id != auth.user.id) {
      return response.status(401);
    }

    await tweet.delete();
  }
}

module.exports = TaskController;
