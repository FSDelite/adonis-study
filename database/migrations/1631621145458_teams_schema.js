"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TeamsSchema extends Schema {
  up() {
    this.create("teams", (table) => {
      table.increments();
      table.string("name", 255).notNullable();
      table.string("login", 255).unique().notNullable();
      table.string("password", 255);
      table.timestamps();
    });
  }

  down() {
    this.drop("teams");
  }
}

module.exports = TeamsSchema;
