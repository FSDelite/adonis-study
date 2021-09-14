"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SectorSchema extends Schema {
  up() {
    this.create("sectors", (table) => {
      table.increments();
      table.string("name", 255).notNullable();
      table.integer("hour_value").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("sectors");
  }
}

module.exports = SectorSchema;
