"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.create("users", (table) => {
      table.increments();
      table.string("username", 64).notNullable().unique();
      table.string("password", 64).notNullable();
      table.string("fullname", 128).notNullable();
      table.string("address", 256).notNullable();
      table.integer("age");
      table.string("phone", 32);
      table.string("avatar", 256);
      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
