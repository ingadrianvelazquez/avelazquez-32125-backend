"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class MessageSchema extends Schema {
  up() {
    this.create("messages", (table) => {
      table.increments();
      table.string("author_email", 128).notNullable().unique();
      table.string("author_name", 128).notNullable();
      table.string("author_surname", 128);
      table.integer("author_age");
      table.string("author_alias", 64).notNullable();
      table.string("author_avatar", 256);
      table.string("msg", 256).notNullable();
      table.date("date");
      table.timestamps();
    });
  }

  down() {
    this.drop("messages");
  }
}

module.exports = MessageSchema;
