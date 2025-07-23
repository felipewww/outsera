import { Module, Global } from '@nestjs/common';
import knex from 'knex';
import knexConfig from '../../../knexfile.js';

@Global()
@Module({
  providers: [
    {
      provide: 'KnexConnection',
      useFactory: async () => {
        const db = knex(knexConfig.development);
        // Executa migrations automaticamente
        console.log('Migrações executadas com sucesso!');
        await db.migrate.latest();
        return db;
      },
    },
  ],
  exports: ['KnexConnection'],
})
export class KnexModule {}
