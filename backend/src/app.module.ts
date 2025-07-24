import { Module } from '@nestjs/common';
import { KnexModule } from './infra/db/knex.module';
import { MoviesModule } from "./movies.module";
import { ProducersModule } from "./producers.module";

@Module({
  imports: [
    KnexModule,
    MoviesModule,
    ProducersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
