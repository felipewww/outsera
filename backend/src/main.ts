import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataLoader } from "./infra/db/data-loader/data-loader";

// export const dataLoader = new DataLoader();

async function bootstrap() {
  // await dataLoader.parse()
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
