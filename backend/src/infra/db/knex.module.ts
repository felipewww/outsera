import { Module, Global } from '@nestjs/common';
import knex from 'knex';
import knexConfig from '../../../knexfile';
import { DataLoader } from "./data-loader/data-loader";
import { DataParser } from "./data-loader/data-parser";

@Global()
@Module({
  providers: [
    {
      provide: 'KnexConnection',
      useFactory: async () => {
        const db = knex(knexConfig.development);

        await db.migrate.latest();
        // console.log('Migrações executadas com sucesso!');

        const dataParser = new DataParser();
        await dataParser.parse();

        const dataLoader = new DataLoader(db);
        await dataLoader.load(dataParser);

        return db;
      },
    },
  ],
  exports: ['KnexConnection'],
})
export class KnexModule {}
