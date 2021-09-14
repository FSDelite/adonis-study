"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.create("user", (table) => {
      table.increments();
      table.string("name", 255).notNullable();
      table.string("cpf", 11).notNullable().unique();
      table.string("password", 60).notNullable();
      table.string("email", 255).notNullable();
      table.boolean("is_admin").defaultTo(false);
      table.integer("team_id").unsigned().references("id").inTable("teams");
      table.integer("sector_id").unsigned().references("id").inTable("sectors");
      table.timestamps();
    });
  }

  down() {
    this.drop("user");
  }
}

module.exports = UserSchema;