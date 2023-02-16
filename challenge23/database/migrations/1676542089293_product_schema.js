"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProductSchema extends Schema {
  up() {
    this.create("products", (table) => {
      table.increments();
      table.string("name", 128).notNullable().unique();
      table.string("desc", 1024);
      table.string("code", 32).notNullable();
      table.string("url", 256);
      table.integer("price").notNullable();
      table.integer("stock");
      table.timestamps();
    });
  }

  down() {
    this.drop("products");
  }
}

module.exports = ProductSchema;
