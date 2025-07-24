/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('movie_has_producer', function (table) {
      // table.increments('id');

      table.integer('movie_id')
        .unsigned()
        .index()
        .references('id')
        .inTable('movies')
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table.integer('producer_id')
        .unsigned()
        .index()
        .references('id')
        .inTable('producers')
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
