import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataLoader } from "./infra/db/data-loader/data-loader";

async function bootstrap() {
  const dataLoader = new DataLoader();
  await dataLoader.load()
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
