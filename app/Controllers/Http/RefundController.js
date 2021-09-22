"use strict";

const TaskController = require("./TaskController");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Refund = use("App/Models/Refund");
/**
 * Resourceful controller for interacting with refunds
 */
class RefundController {
  /**
   * Show a list of all refunds.
   * GET refunds
   */
  async index({ auth }) {
    const isAdmin = auth.user.is_admin;
    if (isAdmin) {
      const refunds = await Refund.query().with("user").fetch();
      return refunds;
    } else {
      const refunds = await Refund.query()
        .where("user_id", auth.user.id)
        .fetch();
      return refunds;
    }
  }

  /*
   * Create/save a new refund.
   * POST refunds
   */
  async store({ request, auth }) {
    const data = request.only([
      "name",
      "description",
      "date",
      "final_value",
      "path",
    ]);
    const refund = await Refund.create({ user_id: auth.user.id, ...data });
    return refund;
  }

  /**
   * Display a single refund.
   * GET refunds/:id
   */
  async show({ params, auth }) {
    //implementar depois que quando o usuário for admin, fazer um join com o usuário que criou ele
    const refund = await Refund.findOrFail(params.id);
    if (refund.user_id == auth.user.id || auth.user.is_admin) {
      return refund;
    } else {
      //throw error unauthorized
    }
  }

  /*
   * Update refund details.
   * PUT or PATCH refunds/:id
   */
  async update({ params, request, response }) {}

  /**
   * Delete a refund with id.
   * DELETE refunds/:id
   */
  async destroy({ params, auth, response }) {
    const refund = await Refund.findOrFail(params.id);
    if (refund.user_id != auth.user.id && !auth.user.is_admin) {
      return response.status(401);
    }
    await refund.delete();
  }
}

module.exports = RefundController;
