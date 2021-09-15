"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TasksSchema extends Schema {
  up() {
    this.create("tasks", (table) => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("name", 255).notNullable();
      table.text("description").notNullable();
      table.text("link");
      table.boolean("status").defaultTo(true);
      table.dateTime("start_date").notNullable();
      table.dateTime("finish_date").notNullable();
      table.float("final_value");
      table.timestamps();
    });
  }

  down() {
    this.drop("tasks");
  }
}

module.exports = TasksSchema;
