import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('ProducersController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/producers/intervals deve retornar min e max com estrutura correta', async () => {
    const response = await request(app.getHttpServer()).get('/producers/intervals');

    expect(response.status).toBe(200);

    const body = response.body;

    // Verifica se tem as chaves min e max
    expect(body).toHaveProperty('min');
    expect(body).toHaveProperty('max');

    // Ambas devem ser arrays
    expect(Array.isArray(body.min)).toBe(true);
    expect(Array.isArray(body.max)).toBe(true);

    // Verifica se cada item de min/max tem a estrutura esperada
    for (const result of [...body.min, ...body.max]) {
      expect(result).toHaveProperty('producer');
      expect(typeof result.producer).toBe('string');

      expect(result).toHaveProperty('interval');
      expect(typeof result.interval).toBe('number');

      expect(result).toHaveProperty('previousWin');
      expect(typeof result.previousWin).toBe('number');

      expect(result).toHaveProperty('followingWin');
      expect(typeof result.followingWin).toBe('number');
    }
  });
});
