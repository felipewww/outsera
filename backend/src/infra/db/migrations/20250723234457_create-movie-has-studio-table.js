/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('movie_has_studio', function (table) {
      // table.increments('id');

      table.integer('movie_id')
        .unsigned()
        .index()
        .references('id')
        .inTable('movies')
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table.integer('studio_id')
        .unsigned()
        .index()
        .references('id')
        .inTable('studios')
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

};
