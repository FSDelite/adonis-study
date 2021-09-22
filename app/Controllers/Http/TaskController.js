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
   */
  async index({ auth }) {
    const isAdmin = auth.user.is_admin;
    if (isAdmin) {
      const tasks = await Task.query().with("user").fetch();
      return tasks;
    } else {
      const tasks = await Task.query().where("user_id", auth.user.id).fetch();
      return tasks;
    }
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

  async show({ params, auth }) {
    //implementar depois que quando o usuário for admin, fazer um join com o usuário que criou ela
    const task = await Task.findOrFail(params.id);
    if (task.user_id == auth.user.id || auth.user.is_admin) {
      return task;
    } else {
      //throw error unauthorized
    }
  }

  /*
   * Update task details.
   * PUT or PATCH tasks/:id
   */
  async update({ params, request, auth, response }) {
    const taskFind = await Task.findOrFail(params.id);

    if (taskFind.user_id != auth.user.id && !auth.user.is_admin) {
      return response
        .status(401)
        .send("Não autorizado a editar a tarefa de outro usuário");
    } else {
      const data = request.only([
        "name",
        "description",
        "link",
        "start_date",
        "finish_date",
      ]);
      const task = await Task.query().where("id", params.id).update(data);
      return task;
    }
  }

  /*
   * Delete a task with id.
   * DELETE tasks/:id
   */
  async destroy({ request, auth, response }) {
    const task = await Task.findOrFail(request.params.id);
    const user = await auth.getUser();

    if (task.user_id != user.id && !user.is_admin) {
      return response
        .status(401)
        .send("Não autorizado a deletar a tarefa de outro usuario");
    }
    await task.delete();
  }
}

module.exports = TaskController;
