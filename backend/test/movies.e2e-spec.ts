import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('MoviesController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/movies (GET) deve retornar todos os filmes', async () => {
    const response = await request(app.getHttpServer()).get('/movies');

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          producer: 'Allan Carr', // exemplo de dado esperado do CSV
        }),
      ]),
    );
  });

  it('/movies (GET) deve retornar a pagina 2', async () => {
    const response = await request(app.getHttpServer()).get('/movies?page=2');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 11, // exemplo de dado esperado do CSV
        }),
      ]),
    );
  });

  it('deve retornar apenas filmes com winner = 1', async () => {
    const response = await request(app.getHttpServer()).get('/movies?winner=1');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    for (const movie of response.body) {
      expect(movie).toHaveProperty('winner');
      expect(movie.winner).toBe(1);
    }
  });

  it('deve retornar apenas filmes com winner = 0', async () => {
    const response = await request(app.getHttpServer()).get('/movies?winner=0');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    for (const movie of response.body) {
      expect(movie).toHaveProperty('winner');
      expect(movie.winner).toBe(0);
    }
  });

  afterAll(async () => {
    await app.close();
  });
});
