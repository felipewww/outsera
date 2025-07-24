export async function up(knex) {
  return knex.schema.createTable("movies", (table) => {
    table.increments("id");

    table.string("title")
      .notNullable();

    table.integer("year")
      .notNullable();

    table.tinyint('winner')
      .notNullable();
  });
}

export async function down(knex) {
  return knex.schema.dropTable("movies");
}
