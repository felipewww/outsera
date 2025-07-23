import { Inject } from "@nestjs/common";
import { Knex } from "knex";

export abstract class DataSource {
  constructor(
    @Inject('KnexConnection') private readonly knex: Knex,
  ) {
  }

  get query() {
    return this.knex.queryBuilder()
  }
}
