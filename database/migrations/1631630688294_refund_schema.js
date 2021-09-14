"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class RefundsSchema extends Schema {
  up() {
    this.create("refunds", (table) => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("user")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("name", 255).notNullable();
      table.text("description").notNullable();
      table.text("path");
      table.boolean("status").defaultTo(true);
      table.dateTime("date").notNullable();
      table.float("final_value");
      table.timestamps();
    });
  }

  down() {
    this.drop("refunds");
  }
}

module.exports = RefundsSchema;
