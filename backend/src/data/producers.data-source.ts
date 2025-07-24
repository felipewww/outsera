import { ProducerWinsModelView } from "./model-views/producer-wins.model-view";
import { DataSource, ModelCols } from "./data-source";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProducersDataSource extends DataSource{
  async getWinnersGrouped(): Promise<ProducerWinsModelView[]> {
    const knex = this.knex;

    const cols: ModelCols<ProducerWinsModelView> = {
      producerId: 'MP.producer_id',
      producerName: 'P.name',
      // rn: knex.raw('ROW_NUMBER() OVER (PARTITION BY MP.producer_id ORDER BY M.year) as rn'),
      years: knex.raw('GROUP_CONCAT(M.year)'),
      countYear: knex.raw('COUNT(M.year)'),
    }

    return this.query
      .select(cols)
      .from('movies AS M')
      .innerJoin('movie_has_producer AS MP', 'MP.movie_id', 'M.id')
      .innerJoin('producers AS P', 'P.id', 'MP.producer_id')
      .where('M.winner', 1)
      .orderBy('M.year', 'DESC')
      .orderBy('MP.producer_id', 'DESC')
      .groupBy('MP.producer_id')
      .having('countYear', '>=', 2)
  }
}
