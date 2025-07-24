import { Inject } from "@nestjs/common";
import { Knex } from "knex";

export type ModelCols<MODEL> = {
  [key in keyof MODEL]: any
}

export abstract class DataSource {
  constructor(
    @Inject('KnexConnection') protected readonly knex: Knex,
  ) {
  }

  get query() {
    return this.knex.queryBuilder()
  }
}
