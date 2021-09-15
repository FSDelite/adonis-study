"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Task extends Model {
  user() {
    return this.belongsTo("App/Modles/User");
  }
}

module.exports = Task;
