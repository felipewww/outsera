import { Module } from '@nestjs/common';
import { KnexModule } from './infra/db/knex.module';
import { MoviesModule } from "./movies.module";

@Module({
  imports: [
    KnexModule,
    MoviesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
